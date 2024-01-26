'use server';

import { Address } from "@/interfaces";
import prisma from '@/lib/prisma';


export const setUserAddress = async (address:Address,userId:string) => {
    try {
        const newAddress = await createOrReplaceAddress(address,userId);

        return {
            ok: true,
            message: 'Direccion guardada correctamente',
            address: newAddress
        }

        
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo guardar la direccion'
        }
    }
}



const createOrReplaceAddress = async (address:Address,userId:string) => {

    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        });
        const addressToSave = {
            userId: userId,
            address: address.address,
            address2: address.address2 ? address.address2 : '',
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
        }

        if(storedAddress){
            const addressDB = await prisma.userAddress.update({
                where: {
                    userId: userId
                },
                data: addressToSave
            });

            return {
                ok: true,
                message: 'Direccion actualizada correctamente',
                address: addressDB
            }
        }else{
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            });

            return {
                ok: true,
                message: 'Direccion guardada correctamente',
                address: addressToSave
            }
        }
        
    } catch (error) {
        throw new Error('No se pudo guardar la direccion');
        
    }

}