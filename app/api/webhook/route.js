import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = await req.text();

    const signature = headers().get("stripe-Signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const { data, type } = event;

    // Handle the event based on its type
    if (type === "checkout.session.completed") {
      console.log("Subscription completed:", data.object);

      await connectMongo();

      const user = await User.findById(data.object.client_reference_id);

      user.hasAccess = true;
      user.customerId = data.object.customer;

      await user.save();
    } else if (type === "customer.subscription.deleted") {
      await connectMongo();

      const user = await User.findOne({
        customerId: data.object.customer,
      });

      user.hasAccess = false;
      user.save();
    }
  } catch (error) {
    console.error("Stripe error:", error?.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json(
    { message: "Webhook received successfully" },
    { status: 200 }
  );
}
