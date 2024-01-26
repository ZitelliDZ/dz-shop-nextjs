"use client";
import { Product } from "@/interfaces";
import { useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const handleMouseEnter = () => {
    setDisplayImage(product.images[1]);
  };
  const handleMouseLeave = () => {
    setDisplayImage(product.images[0]);
  };

  return (
    <div className=" rounded-md overflow-hidden fade-in ">
      <ProductImage
        src={displayImage}
        alt={product.title}
        width={500}
        height={500}
        style={{ width: 500, height: 500 }}
        layout={`${product.title}`}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        className="w-full object-cover rounded-lg "
      />
      <div className="p-4 flex flex-col ">
        <Link
          href={`/product/${product.slug}`}
          className="hover:underline hover:text-blue-600 "
        >
          {product.title}
        </Link>
        <span className=" font-bold ">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductGridItem;
