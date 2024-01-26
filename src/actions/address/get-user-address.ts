'use server';
import prisma from '@/lib/prisma';

export const getUserAddress = async (userId:string) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        });

        if(!address){
            return null
        }
        
        const {countryId, ...rest} = address;

        return {
            ok: true,
            message: 'Direccion obtenida correctamente',
            address: {...rest, countryId: countryId}
        }
        

        
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo obtener la direccion'
        }
    }
}