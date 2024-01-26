import { MercadoPagoConfig, Payment } from "mercadopago";
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest, response: NextResponse) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.NEXT_ACCESS_TOKEN_MP!,
  });

  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  /*if(secret !== process.env.NEXT_PUBLIC_MP_WEBHOOK_SECRET){
        //return Response.json({success:false})
    }*/

  const payment: PaymentResponse = await new Payment(client).get({
    id: body.data.id,
  });

  try {
    await prisma.order.update({
      where: {
        id: payment.external_reference,
      },
      data: {
        transactionId: `${payment.id}`,
        isPaid: "pendingConfirm",
        paidAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
