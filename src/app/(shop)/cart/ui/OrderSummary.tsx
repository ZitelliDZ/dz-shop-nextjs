"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

const OrderSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { subTotal, tax, total, totalItems } = useCartStore((state) =>
    state.getSummaryInfo()
  );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" grid grid-cols-2 ">
      <span>No. Productos</span>
      <span className=" text-right ">
        {" "}
        {totalItems === 1 ? "1 artículo" : `${totalItems} artículos`}
      </span>

      <span>Subtotal</span>
      <span className=" text-right "> {currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className=" text-right "> {currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl ">Total </span>
      <span className=" mt-5 text-2xl text-right ">
        {" "}
        {currencyFormat(total)}
      </span>
    </div>
  );
};

export default OrderSummary;
