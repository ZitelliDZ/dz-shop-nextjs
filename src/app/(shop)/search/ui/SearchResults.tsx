"use client";

import { ProductImage } from "@/components";
import { Gender, Size } from "@/interfaces";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  gender: Gender;
  categoryId: string;
  images: {
    id: number;
    url: string;
  }[];
}

interface Props {
  products: Product[] | undefined;
}
export const SearchResults = ({ products }: Props) => {
  return (
    <>
      {products &&
        products.map((product) => (
          <div key={product.id+'-'+product.gender} className="break-inside relative  flex flex-col justify-between space-y-3 text-sm rounded-xl w-full h-full p-4 mb-4 bg-gray-300 border-2 border-slate-700 text-black  ">
            <div className="flex flex-row items-start space-x-3">
              <ProductImage
                src={product.images[0].url}
                alt={product.title}
                width={200}
                height={200}
                className="rounded-xl"
              />
              <div className="flex flex-col ">
                <span className="text-2xl font-bold capitalize">{product.title}</span>
                <div>{product.description}</div>
                  <span className="font-bold">{currencyFormat(product.price)}</span>
                  <span className="font-bold">Stock: {product.inStock}</span>
                  <span>{}</span>
                  <Link href={`/product/${product.slug}`} className="flex w-[200px] items-center justify-center text-xs font-medium rounded-full px-4 py-1 space-x-1 border-2 border-black bg-white hover:bg-black hover:text-white text-black dark:bg-slate-800 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
                <span>Ir</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h13M12 5l7 7-7 7" />
                </svg>
              </Link>
              </div>
              
            </div>
          </div>
        ))}
    </>
  );
};

export default SearchResults;
