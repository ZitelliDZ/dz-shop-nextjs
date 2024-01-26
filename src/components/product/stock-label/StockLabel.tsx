"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      if (!isLoading) return;
      const stock = await getStockBySlug(slug);
      setStock(stock);
      setIsLoading(false);
    };

    getStock();
  }, [slug, isLoading]);

  return (
    <div>
      {!isLoading ? (
        <h1 className={`${titleFont.className} antialiased font-bold text-xl `}>
          Stock: {stock}
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl bg-gray-300 animate-pulse`}
        >
          &nbsp;
        </h1>
      )}
    </div>
  );
};

export default StockLabel;
