import Midtrans from "midtrans-client"
import { NextResponse } from "next/server"

const snap = new Midtrans.Snap({
  isProduction: true,
  serverKey: process.env.MID_TRANS_SECRET || "",
  clientKey: process.env.NEXT_PUBLIC_MID_TRANS_CLIENT || ""
})

export async function POST(request: Request){
  const {id, productName, price, quantity, customer_details} = await request.json()

  const parameter = {
    item_details: {
        name: productName,
        price: price,
        quantity: quantity
    },
    transaction_details: {
        order_id: id,
        gross_amount: price * quantity
    },
    customer_details: customer_details
  }

  const token = await snap.createTransaction(parameter)
  console.log(token)
  return NextResponse.json({ token: token.token })
}