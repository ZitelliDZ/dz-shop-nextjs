import { getOrderById } from "@/actions";
import { MpButton, OrderStatus, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const OrderPage = async ({ params }: Props) => {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const orderAddress = order?.orderAddress;
  const orderItems = order?.itemsInOrder;

  //Verificar si la orden existe
  //Redirect a 404 si no existe

  return (
    <div className=" flex justify-center items-center mb-72 px-10 sm:px-0 ">
      <div className=" flex flex-col w-[1000px] ">
        <Title title={`Orden #${order?.id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/**Carrito */}
          <div className=" flex flex-col  ">
            <OrderStatus isPaid={order?.isPaid ?? "pendingPayment"} />

            {/**Items */}
            {order?.orderItems.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-10"
              >
                <ProductImage
                  width={100}
                  height={100}
                  src={item.product.images[0]?.url ?? ""}
                  alt={item.product.title}
                  className=" mr-5 rounded-lg "
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className=" font-bold ">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/**Checkout */}
          <div className=" bg-white rounded-xl shadow-xl p-7 ">
            <h2 className=" text-2xl mb-2 font-bold ">Dirección de entrega</h2>
            <div className=" mb-4 ">
              <p className=" text-xl ">
                {orderAddress?.firstName} {orderAddress?.lastName}
              </p>
              <p>{orderAddress?.address}</p>
              <p>{orderAddress?.address2}</p>
              <p>{orderAddress?.postalCode}</p>
              <p>
                {orderAddress?.city}, {orderAddress?.countryId}
              </p>
              <p>{orderAddress?.phone}</p>
            </div>

            {/**Divider */}
            <div className=" w-full h-0.5 rounded bg-gray-200 mb-4 " />

            <h2 className=" text-2xl mb-2 ">Resumen de orden</h2>

            <div className=" grid grid-cols-2 ">
              <span>No. Productos</span>
              <span className=" text-right ">
                {" "}
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className=" text-right ">
                {" "}
                {currencyFormat(order!.subtotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className=" text-right ">
                {" "}
                {currencyFormat(order!.tax)}
              </span>

              <span className="mt-5 text-2xl ">Total </span>
              <span className=" mt-5 text-2xl text-right ">
                {" "}
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              {order?.isPaid === "aproved" ? (
                <OrderStatus isPaid={"aproved"} />
              ) : order?.isPaid === "pendingConfirm" ? (
                <OrderStatus isPaid={"pendingConfirm"} />
              ) : order?.isPaid === "rejected" ? (
                <OrderStatus isPaid={"rejected"} />
              ) : (
                <>
                  <MpButton order={order!} />
                  {/*<PayPalButton amount={order!.total} orderId={order!.id} /> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
