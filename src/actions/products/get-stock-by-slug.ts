'use server';
import prisma from '../../lib/prisma';



export const getStockBySlug = async (slug:string) => {
    try {
        const stock = await prisma.product.findUnique({
            where: {
                slug: slug
            },
            select: {
                inStock: true,
            }
        });

        if(!stock) throw new Error('No se encontró el stock');

        return stock.inStock
    } catch (error) {
        throw new Error('No se pudo obtener el stock');
    }
}