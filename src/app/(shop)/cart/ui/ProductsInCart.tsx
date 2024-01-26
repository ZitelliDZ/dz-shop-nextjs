"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsInCart = () => {
  const [loading, setLoading] = useState(true);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  useEffect(() => {
    setLoading(false);

    if (productsInCart.length === 0) {
      redirect("/empty");
    }
  }, [productsInCart]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-10">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            className=" mr-5 rounded-lg object-cover "
            style={{ width: 100, height: 100 }}
          />
          <div>
            <Link href={`/product/${product.slug}`}>
              <p className=" hover:underline ">{product.title}</p>
            </Link>
            <p>Talle: {product.size}</p>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              onClick={() => removeProduct(product)}
              className=" underline mt-3 "
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
