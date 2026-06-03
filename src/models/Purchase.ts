import { Schema, models, model } from "mongoose";

const PurchaseSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
    },

    products: {
      type: [String],
      required: true,
    },

    downloads: {
      type: [String],
      required: true,
    },

    amountTotal: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "usd",
    },

    paymentStatus: {
      type: String,
      required: true,
    },

    customerName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Purchase =
  models.Purchase || model("Purchase", PurchaseSchema);

export default Purchase;