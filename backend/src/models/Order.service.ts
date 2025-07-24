import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import TransactionModel from "../schema/Transaction.model";
import { Member } from "../libs/types/member";

import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { shapeIntoMongooseObjectId, stripe } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { ObjectId } from "mongoose";
import MemberService from "./Member.service";
import { OrderState, OrderStatus } from "../libs/enums/order.enum";
import Stripe from "stripe";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly transactionModel;
  private readonly memberService;

  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
    this.transactionModel = TransactionModel;
    this.memberService = new MemberService();
  }

  public async createOrder(
    member: Member,
    input: OrderItemInput[]
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const amount = input.reduce((accumulator: number, item: OrderItemInput) => {
      return accumulator + item.itemPrice * item.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;

    try {
      const newOrder: Order = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDelivery: delivery,
        memberId: memberId,
      });

      const orderId = newOrder._id;
      console.log("orderId:", newOrder._id);
      await this.recordOrderItem(orderId, input);

      return newOrder;
    } catch (err) {
      console.log("Error, model:createOrder:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  private async recordOrderItem(
    orderId: ObjectId,
    input: OrderItemInput[]
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);
      await this.orderItemModel.create(item);
      return "INSERTED";
    });

    const orderItemsState = await Promise.all(promisedList);
    console.log("orderItemsState", orderItemsState);
  }

  public async getMyOrders(
    member: Member,
    inquiry: OrderInquiry
  ): Promise<Order[]> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const matches = { memberId: memberId, orderStatus: inquiry.orderStatus };

    const result = await this.orderModel
      .aggregate([
        { $match: matches },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "productData",
          },
        },
      ])
      .exec();
    // if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateOrder(
    member: Member,
    input: OrderUpdateInput
  ): Promise<Order> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus;

    const result = await this.orderModel
      .findOneAndUpdate(
        {
          memberId: memberId,
          _id: orderId,
        },
        { orderStatus: orderStatus },
        { new: true }
      )
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    if (orderStatus === OrderStatus.PROCESS) {
      await this.memberService.addUserPoint(member, 1);
    }
    return result;
  }

  public async createPayment(
    memberId: ObjectId | null,
    orderId: string
  ): Promise<Stripe.PaymentIntent> {
    const orderIdObject = shapeIntoMongooseObjectId(orderId);
    let paymentIntent: Stripe.PaymentIntent;

    let orderResult = await this.orderModel
      .findOne({
        _id: orderIdObject,
        orderStatus: OrderStatus.PROCESS,
      })
      .exec();
    if (!orderResult)
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    const orderTotal = Math.round(Number(orderResult.orderTotal) * 100);

    try {
      paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: orderTotal,
        automatic_payment_methods: { enabled: true },
        metadata: { orderId: orderId },
      });
    } catch (err) {
      console.log("Error, model:createPayment:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }

    return paymentIntent;
  }

  public async createTransaction(id: string): Promise<void> {
    console.log("createTransaction");

    try {
      await this.transactionModel.create({
        orderId: id,
      });
    } catch (err) {
      console.log("Error, model:createTransaction:", err);
    }
  }

  public async updateOrderState(orderId: string): Promise<void> {
    const result = await this.orderModel
      .findOneAndUpdate(
        {
          _id: orderId,
        },
        { orderState: OrderState.PAID, orderStatus: OrderStatus.FINISH }
      )
      .exec();
    if (!result) {
      console.log("Error, updateOrderState");
      throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    }
  }
}

export default OrderService;
