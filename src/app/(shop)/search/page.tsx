"use client";

import { Title } from "@/components";
import { ChangeEvent, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { searchPlacesByTerm } from "@/actions";
import { Gender, Size } from "@/interfaces";
import SearchResults from "./ui/SearchResults";

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

const SearchPage = () => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onQueryChange = (query: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    if (query.target.value === "") {
      setProducts([]);
      setIsLoading(false);
      return;
    }
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      
      if (query.target.value === "") {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      const { ok, products } = await searchPlacesByTerm(query.target.value);
      if (ok) {
        setProducts(products);
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="h-[80vh]">
      <Title title="Buscar" />

      <div className="relative mt-14 mb-6  ">
        <IoSearchOutline
          size={25}
          className=" absolute top-2 left-2 text-gray-400 "
        />
        <input
          type="text"
          placeholder="Buscar un producto..."
          onChange={onQueryChange}
          className=" w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-2 text-xl border-gray-600 focus:outline-none focus:border-blue-500 "
        />
      </div>

     
        {isLoading ? (
          <div className="flex w-full justify-center">
            <div className="w-20 h-20 rounded-full animate-spin absolute border-4 border-dashed border-gray-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex w-full flex-col overflow-y-scroll h-[60vh] ">
            <div className="flex flex-col">
              <SearchResults products={products} />
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchPage;
