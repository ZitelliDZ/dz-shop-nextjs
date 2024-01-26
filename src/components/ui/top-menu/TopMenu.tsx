"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUiStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const totalItemsCart = useCartStore((state) => state.getTotalItems());

  const openMenu = useUiStore((state) => state.openSideMenu);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <nav className=" flex px-5 justify-between items-center w-full ">
      {/**Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold `}>
            DZ
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/**Center Menu */}
      <div className="hidden sm:block ">
        <Link
          className=" m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className=" m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className=" m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>
      {/**Search, Cart, Menu */}
      <div className=" flex items-center ">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className=" w-5 h-5 " />
        </Link>
        <Link
          href={totalItemsCart > 0 && !isLoading ? "/cart" : "/empty"}
          className="mx-2"
        >
          <div className=" relative ">
            {!isLoading && totalItemsCart > 0 && (
              <span className=" fade-in absolute text-xs font-bold rounded-full px-1 -top-2 bg-rose-700 text-white -right-3">
                {totalItemsCart}
              </span>
            )}
            <IoCartOutline className=" w-5 h-5 " />
          </div>
        </Link>
        <button
          className=" m-2 p-2 rounded-md transition-all hover:bg-gray-100 "
          onClick={() => openMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};

export default TopMenu;
