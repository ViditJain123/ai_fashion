import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface ProductforOrder extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: Number;
}

const ProductforOrderSchema: Schema<ProductforOrder> = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

export interface Order extends Document {
  user: mongoose.Schema.Types.ObjectId;
  productForOrder: mongoose.Schema.Types.ObjectId[];
  address: String;
  payMethod: String;
  payStatus: String;
  orderStatus: String;
}

const OrderSchema: Schema<Order> = new Schema({
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
})

const OrderModel =
  (mongoose.models.Order as mongoose.Model<Order>) ||
  mongoose.model<Order>("Order", OrderSchema);

module.exports = OrderModel;