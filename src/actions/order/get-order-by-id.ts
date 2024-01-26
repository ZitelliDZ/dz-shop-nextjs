'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (orderId: string) => {

    const session = await auth();

    if (!session?.user) {
        return { ok: false, message: "Debe estar autenticado." };
    }


    try {
        const order = await prisma.order.findFirst({
            where: {
                id: orderId
            },
            include: {
                orderAddress: true,
                orderItems: {
                    select:{
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                images: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        

        if (!order) {
            return { ok: false, message: "No se pudo obtener la orden." };
        }

        if (session.user.role === 'user') {
            if (session.user.id !== order.userId) {
                throw new Error("No tiene permisos para ver esta orden.");
            }
        }

        return { ok: true, order };
        
    } catch (error) {
        return { ok: false, message: "No se pudo obtener la orden." };
    }
}