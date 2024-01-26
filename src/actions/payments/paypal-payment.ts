"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de paypal",
    };
  }
  
  const resp = await verifyPayPalPayment(authToken, transactionId);

    if (!resp) {
        return {
        ok: false,
        message: "No se pudo verificar el pago",
        };
    }

    const {purchase_units, status} = resp;
    const orderId = purchase_units[0].invoice_id;
    
    if (status !== "COMPLETED") {
        return {
        ok: false,
        message: "Aun no se ha pagado en paypal",
        };
    }

    try {
        await prisma.order.update({
            where:{
                id:  orderId,
            },
            data:{
                isPaid: 'aproved',
                paidAt: new Date(),
            }
        });

        revalidatePath(`/orders/${orderId}`);
        return{
            ok: true,
            message: 'El pago se verifico correctamente'
        }
    } catch (error) {
        return {
        ok: false,
        message:'500 - El pago no se pudo verificar'
        }
    }

};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const NEXT_PUBLIC_PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(PAYPAL_OAUTH_URL, {...requestOptions,cache:'no-store'}).then((res) =>
      res.json()
    );
    return result.access_token;
  } catch (error) {
    console.log("🚀 ~ getPaypalBearerToken ~ error:", error);
    return null;
  }
};

const verifyPayPalPayment = async (
  bearerToken: string,
  transactionId: string
):Promise<PayPalOrderStatusResponse|null> => {
  const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL+'/'+transactionId;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + bearerToken);

  const raw = JSON.stringify({
    completed: true,
  });

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(PAYPAL_ORDERS_URL, {...requestOptions,cache:'no-store'}).then((res) =>
      res.json()
    );
    return response;
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return null;
    
  }
};
