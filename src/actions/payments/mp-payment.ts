'use server';
import { StatusIsPaid } from '@prisma/client';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';


interface Order{
        id: string;
        subtotal: number;
        tax: number;
        total: number;
        itemsInOrder: number;
        isPaid: StatusIsPaid;
        isDelivered: boolean;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        transactionId: string | null;
    
}


export const mpCheckPayment = async (order:Order) => {

    const client = new MercadoPagoConfig({ accessToken: process.env.NEXT_ACCESS_TOKEN_MP! });

    const preference = new Preference(client);

    const res = await preference.create({
        body: {
            external_reference: order?.id,
            items: [
                {
                    id: order?.id,
                    title:  `Order #${order?.id.split("-").at(-1)}`,
                    quantity: 1,
                    unit_price: order.total,
                }
            ],
            redirect_urls: {
                failure: `${process.env.NEXTAUTH_URL}/orders/${order?.id}`,
                success: `${process.env.NEXTAUTH_URL}/orders/${order?.id}`,
            },
            back_urls:{
                failure: `${process.env.NEXTAUTH_URL}/orders/${order?.id}`,
                success: `${process.env.NEXTAUTH_URL}/orders/${order?.id}`,
            },
            auto_return: 'approved'
         }
        })

    redirect(res.sandbox_init_point!);
    
}