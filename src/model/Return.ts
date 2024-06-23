import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface ProductforReturn extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: Number;
}

const ProductforOrderSchema: Schema<ProductforReturn> = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export interface Return extends Document {
  user: mongoose.Schema.Types.ObjectId;
  productForOrder: mongoose.Schema.Types.ObjectId[];
  address: String;
  payMethod: String;
  payStatus: String;
  orderStatus: String;
}

const ReturnSchema: Schema<Return> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productForOrder: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  payMethod: {
    type: String,
    required: [true, "Payment Method is required"],
  },
  payStatus: {
    type: String,
    required: [true, "Payment Status is required"],
  },
  orderStatus: {
    type: String,
    required: [true, "Order Status is required"],
  },
});

const ReturnModel =
  (mongoose.models.Return as mongoose.Model<Return>) ||
  mongoose.model<Return>("Return", ReturnSchema);

module.exports = ReturnModel;
