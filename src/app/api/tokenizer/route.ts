import Midtrans from "midtrans-client"
import { NextResponse } from "next/server"

const snap = new Midtrans.Snap({
  isProduction: process.env.NODE_ENV === 'production', 
  serverKey: process.env.MID_TRANS_SECRET || "",
  clientKey: process.env.NEXT_PUBLIC_MID_TRANS_CLIENT || "Mid-client-upoz3oMJm2XwHG5u"
})

export async function POST(request: Request){
 try {
    const { id, productName, price, quantity, customer_details } = await request.json();

    const parameter = {
      item_details: {
        name: productName,
        price: price,
        quantity: quantity,
      },
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
      customer_details: customer_details,
    };

    // This is the line that can fail
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;

    console.log("Midtrans Token successfully created:", token);
    return NextResponse.json({ token });

  } catch (error) {
    // This block will run if snap.createTransaction fails
    console.error("Midtrans API Error:", error);

    // Send a structured JSON error back to the client
    return NextResponse.json(
      {
        error: "Failed to create transaction.",
        // Providing the actual error message can be very helpful for debugging
        details: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}