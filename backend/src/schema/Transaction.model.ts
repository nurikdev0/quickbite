import mongoose, { Schema } from "mongoose";
import { TransactionState } from "../libs/enums/transaction";

const transactionSchema = new Schema(
  {
    transactionState: {
      type: String,
      enum: TransactionState,
      default: TransactionState.PAID,
    },

    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "order",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
