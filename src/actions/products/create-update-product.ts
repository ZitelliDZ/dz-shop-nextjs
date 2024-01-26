"use server";

import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(0))),

  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((value) => value.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {

  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
      message: "Los datos enviados no son válidos",
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...productData } = product;
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = productData.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: {
            id: id,
          },
          data: {
            ...productData,
            sizes: {
              set: productData.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...productData,
            sizes: {
              set: productData.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      if (formData.getAll("images")) {
        // [https:url.com, https:url.com]
        const images = await uploadImages(formData.getAll("images") as File[]);
        if(!images) {
          throw new Error("Error al subir las imágenes")
        }

        await prisma.productImage.createMany({
            data: images.map((image) => ({
                url: image!,
                productId: product.id,
            })),
        });

      }

      return {
        ok: true,
        product: product,
      };
    });

    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${prismaTx.product.slug}`);
    revalidatePath(`/products/${prismaTx.product.slug}`);
    return {
      ok: true,
      message: "Producto creado/actualizado correctamente",
      product: prismaTx.product,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al crear/actualizar el producto",
    };
  }
};

const uploadImages = async (images: File[]) => {
  cloudinary.config(process.env.CLOUDINARY_URL ?? "");

  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((res) => res.secure_url);
      } catch (error) {
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
