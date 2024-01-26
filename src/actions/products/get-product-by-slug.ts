'use server';
import prisma from '../../lib/prisma';


export const getProductBySlug = async (slug:string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug: slug
            },
            include: {
                images: {
                    select: {
                        url: true,
                        id: true
                    }
                }
            }
        });

        //if(!product) throw new Error('No se encontró el producto');
        if(!product) return null;

        return {
            ...product,
            image: product.images,
            images: product.images.map(image => image.url)
        }
    } catch (error) {
        throw new Error('No se pudo obtener el producto');
    }
}