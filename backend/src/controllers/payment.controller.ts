import Stripe from "stripe";
import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import OrderService from "../models/Order.service";
import { stripe } from "../libs/config";

const paymentController: T = {};
const orderService = new OrderService();

paymentController.verifyAuthPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"] as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    (req as any).stripeOrderId = paymentIntent.metadata.orderId;
    (req as any).stripeEventType = event.type;

    console.log(`Webhook signature verification success.`);
    res.sendStatus(200);
    next();
  } catch (err) {
    console.log(`Webhook signature verification failed.`);
    res.status(400).end();
    return;
  }
};

paymentController.pay = async (
  req: Request,
  res: Response
): Promise<string> => {
  try {
    const eventType = (req as any).stripeEventType;
    const orderId = (req as any).stripeOrderId;

    if (eventType === "payment_intent.succeeded") {
      console.log("Payment captured!");

      await orderService.createTransaction(orderId);
      await orderService.updateOrderState(orderId);
    } else if (eventType === "payment_intent.payment_failed") {
      console.log("Payment failed.");
    }
  } catch (err) {
    console.log(`payment_intent error`, err);
  }
  return "";
};

export default paymentController;
