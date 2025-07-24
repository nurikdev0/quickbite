import mongoose, { Schema } from "mongoose";
import { OrderState, OrderStatus } from "../libs/enums/order.enum";

const orderSchema = new Schema(
  {
    orderTotal: {
      type: Number,
      required: true,
    },

    orderDelivery: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PAUSE,
    },

    orderState: {
      type: String,
      enum: OrderState,
      default: OrderState.PENDING,
    },

    memberId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "member",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
