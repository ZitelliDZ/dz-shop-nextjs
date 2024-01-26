import { StatusIsPaid } from "@prisma/client";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
interface Props {
  isPaid: StatusIsPaid;
}
export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": isPaid === "rejected",
          "bg-green-600": isPaid === "aproved",
          "bg-yellow-400": isPaid === "pendingPayment",
          "bg-orange-400": isPaid === "pendingConfirm",
        }
      )}
    >
      <IoCardOutline size={30} />
      {isPaid === "pendingPayment" ? (
        <span className="mx-2">Pendiente de pago</span>
      ) : isPaid === "aproved" ? (
        <span className="mx-2">Pagado</span>
      ) : isPaid === "pendingConfirm" ? (
        <span className="mx-2">Pendiente de confirmación</span>
      ) : (
        <span className="mx-2">Pago rechazado</span>
      )}
    </div>
  );
};

export default OrderStatus;
