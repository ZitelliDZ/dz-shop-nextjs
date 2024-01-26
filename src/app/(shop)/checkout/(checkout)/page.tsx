import { Title } from "@/components";
import Link from "next/link";
import React from "react";
import ProductsInCart from "./ui/ProductsInCart";
import PlaceOrder from "./ui/PlaceOrder";

const CheckoutPage = () => {
  return (
    <div className=" flex justify-center items-center mb-72 px-10 sm:px-0 ">
      <div className=" flex flex-col w-[1000px] ">
        <Title title="Verificar Orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/**Carrito */}
          <div className=" flex flex-col  ">
            <span className=" text-xl ">Editar</span>
            <Link href="/cart" className="underline mb-5 ">
              Editar carrito
            </Link>

            {/**Items */}
            <ProductsInCart />
          </div>
          {/**Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
