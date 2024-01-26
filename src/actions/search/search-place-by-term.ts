'use server';
import prisma from '@/lib/prisma';

export const searchPlacesByTerm = async (query: string) => {

    try {
        const products = await prisma.product.findMany({
            where: {
            OR: [{
                title: {
                contains: query,
                mode: "insensitive"
                }
            }, {
                description: {
                contains: query,
                mode: "insensitive"
                }
            }]
            },
            include: {
                images: {
                    select: {
                        url: true,
                        id: true
                    },
                }
            }
        });
        if(!products){
            return {
                ok: true,
                products: []
            }
        }
        return {
            ok: true,
            products
        }
    } catch (error) {
        return {
            ok: false,
            message:'No se puedo encontrar productos'
        }
        
    }
    
}