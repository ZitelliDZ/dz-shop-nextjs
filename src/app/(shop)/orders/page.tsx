import { getOrdersByUser } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders } = await getOrdersByUser();

  if (!ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.orderAddress?.firstName} {order.orderAddress?.lastName}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid === "rejected" ? (
                    <div className="bg-red-500 flex items-center px-2 py-1 rounded text-white">
                      <IoCardOutline className="" />
                      <span className="mx-2 bg-red-500 text-white">
                        Pago rechazado.
                      </span>
                    </div>
                  ) : order.isPaid === "aproved" ? (
                    <div className="bg-green-500 flex items-center px-2 py-1 rounded text-white">
                      <IoCardOutline className="" />
                      <span className="mx-2 bg-green-500 text-white">
                        Pagado
                      </span>
                    </div>
                  ) : order.isPaid === "pendingPayment" ? (
                    <div className="bg-yellow-400 flex items-center px-2 py-1 rounded text-white">
                      <IoCardOutline className="" />
                      <span className="mx-2 bg-yellow-400 text-white">
                        Pendiente de pago.
                      </span>
                    </div>
                  ) : (
                    <div className="bg-orange-400 flex items-center px-2 py-1 rounded text-white">
                      <IoCardOutline className="" />
                      <span className="mx-2 bg-orange-400 text-white">
                        Pendiente de confirmación.
                      </span>
                    </div>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex pb-5 pt-10 gap-3 items-center ">
          <div>Tipos de estados: </div>
          <div className="bg-red-500 flex items-center px-2 py-1 rounded text-white">
            <IoCardOutline className="" />
            <span className="mx-2 bg-red-500 text-white">Pago rechazado.</span>
          </div>

          <div className="bg-green-500 flex items-center px-2 py-1 rounded text-white">
            <IoCardOutline className="" />
            <span className="mx-2 bg-green-500 text-white">Pagado</span>
          </div>

          <div className="bg-yellow-400 flex items-center px-2 py-1 rounded text-white">
            <IoCardOutline className="" />
            <span className="mx-2 bg-yellow-400 text-white">
              Pendiente de pago.
            </span>
          </div>

          <div className="bg-orange-400 flex items-center px-2 py-1 rounded text-white">
            <IoCardOutline className="" />
            <span className="mx-2 bg-orange-400 text-white">
              Pendiente de confirmación.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
