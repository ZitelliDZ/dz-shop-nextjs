"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsInCart = () => {
  const [loading, setLoading] = useState(true);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoading(false);

    if (productsInCart.length === 0) {
      redirect("/empty");
    }
    //} ,[productsInCart])
  }, [productsInCart.length]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-10">
          <ProductImage
            width={100}
            height={100}
            src={product.image}
            alt={product.title}
            className=" mr-5 rounded-lg object-cover "
          />
          <div>
            <span>
              <p className=" hover:underline ">{product.title}</p>
            </span>
            <p>Talle: {product.size}</p>
            <p>Cantidad: {product.quantity}</p>
            <p className="">x1 ${product.price}</p>
            <p className=" font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
