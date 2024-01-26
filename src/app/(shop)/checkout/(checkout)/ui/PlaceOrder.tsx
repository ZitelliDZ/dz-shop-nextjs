"use client";

import { placeOrder } from "@/actions";
import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlaceOrder = () => {
  const router = useRouter();
  const [loadding, setLoadding] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlaceingOrder, setIsPlaceingOrder] = useState(false);

  const clearCart = useCartStore((state) => state.clearCart);
  const address = useAddressStore((state) => state.address);

  const { subTotal, tax, total, totalItems } = useCartStore((state) =>
    state.getSummaryInfo()
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoadding(false);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlaceingOrder(true);

    const { rememberAddress, ...rest } = address;
    const productToOrder = cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      };
    });

    const res = await placeOrder(productToOrder, rest);
    if (!res.ok) {
      setIsPlaceingOrder(false);
      setErrorMessage(res.message);
      return;
    }
    setIsPlaceingOrder(false);
    clearCart();
    router.replace(`/orders/${res.order!.id}`);
  };

  if (loadding) {
    return <p>Cargando</p>;
  }

  return (
    <div className=" bg-white rounded-xl shadow-xl p-7 ">
      <h2 className=" text-2xl mb-2 font-bold ">Dirección de entrega</h2>
      <div className=" mb-4 ">
        <p className=" text-xl ">
          {address.firstName} - {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/**Divider */}
      <div className=" w-full h-0.5 rounded bg-gray-200 mb-4 " />

      <h2 className=" text-2xl mb-2 ">Resumen de orden</h2>

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
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className=" text-xs ">
            Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className=" underline ">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className=" underline ">
              política de privacidad
            </a>
          </span>
        </p>
        {/**<p className="text-red-500" >Error de creación.</p> */}
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlaceingOrder,
            "btn-disabled": isPlaceingOrder,
          })}
          //href={"/orders/123"}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
