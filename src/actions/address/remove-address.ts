'use server';

import { Address } from "@/interfaces";
import prisma from '@/lib/prisma';


export const deleteAddress = async (userId:string) => {
    try {
        const address = await prisma.userAddress.delete({
            where: {
                userId: userId
            }
        });
        
        return {
            ok: true,
            message: 'Direccion eliminada correctamente'
        }
        

        
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo eliminar la direccion'
        }
    }
}
