"use client";

import { mpCheckPayment } from "@/actions/payments/mp-payment";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { StatusIsPaid } from "@prisma/client";

interface Props {
  order: {
    id: string;
    subtotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
    isPaid: StatusIsPaid;
    isDelivered: boolean;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    transactionId: string | null;
  };
}

export const MpButton = ({ order }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMercadoPago = async () => {
    if (isLoading) return;
    setIsLoading(true);
    mpCheckPayment(order!);
  };

  return (
    <>
      <div
        className={clsx({
          "flex w-full  h-14 justify-center items-center border-blue-500 border-4 rounded-lg hover:bg-blue-500 cursor-pointer overflow-hidden  shadow-xl":
            isLoading === false,
          "flex w-full  h-14 justify-center items-center bg-gray-400 border-gray-400 border-4 rounded-lg hover:bg-gray-400 cursor-pointer overflow-hidden  shadow-xl":
            isLoading === true,
        })}
        onClick={() => {
          handleMercadoPago();
        }}
      >
        <Image
          src="/imgs/mercadopago.png" // Ruta al archivo SVG en la carpeta 'public'
          alt="Logo" // Texto alternativo para accesibilidad
          width={500} // Ancho de la imagen
          height={500} // Altura de la imagen
          className="object-contain  h-40 "
        />
      </div>
    </>
  );
};

export default MpButton;
