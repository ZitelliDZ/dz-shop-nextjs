"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId)
    return {
      ok: false,
      message: "No hay session de usuario",
    };

  // Obtener informacion de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  const itemsInOrder = productIds.reduce((acc, curr) => acc + curr.quantity, 0);

  // Los totales de tax, subtotal y total
  const { subtotal, total, tax } = productIds.reduce(
    (acc, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`${item.productId} no existe - 500.`);

      const subtotal = product.price * productQuantity;
      acc.subtotal += subtotal;
      acc.tax += subtotal * 0.15;
      acc.total += subtotal * 1.15;

      return acc;
    },
    {
      tax: 0,
      subtotal: 0,
      total: 0,
    }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. actualizar stock
      const updatedProductsPromises = products.map(async (product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, curr) => acc + curr.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            //inStock: product.inStock - productQuantity
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(`${product.title} no tiene stock suficiente`);
      });

      // 2. crear orden header - detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subtotal: subtotal,
          tax: tax,
          total: total,
          isPaid: 'pendingPayment',

          orderItems: {
            createMany: {
              data: productIds.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                size: item.size,
                price:
                  products.find((p) => p.id === item.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. crear orden de envio
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          address2: restAddress.address2 ?? "",
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      message: "Orden creada exitosamente",
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
