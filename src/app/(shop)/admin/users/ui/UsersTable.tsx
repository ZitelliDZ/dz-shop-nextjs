'use client';

import { changeUserRole } from "@/actions";
import { ProductImage } from "@/components";
import { User } from "@/interfaces";
import Image from "next/image";


interface Props {
    users: User[];
}

export const UsersTable = ({users}:Props) => {




  return (
    
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
          Email
        </th>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Rol
        </th>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Imagen
        </th>
        <th
          scope="col"
          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
        >
          Actualizar rol
        </th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user, index) => (
            <tr
                key={user.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.email}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.role}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.image && (
                  <ProductImage
                    src={`${user.image}`}
                    width={100}
                    height={100}
                    alt={user.name}
                    className=" w-10 h-10 rounded-full "
                />
                )}
                </td>
                
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                 <select className=" text-sm text-gray-900 w-full p-2 " name="" id="" value={user.role} onChange={e => changeUserRole(user.id,e.target.value )} >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                 </select>
                </td>
            </tr>
            ))
      }
    </tbody>
  </table>
  )
}

export default UsersTable
