import mongoose, { Schema, Document } from "mongoose";

export interface Order extends Document {
    userWhoOrdered: string;
    orderItems: [],
    orderTotal: number;
    orderDate: Date;
    orderStatus: string;
    payMethod: string;
    payStatus: string;
}

const OrderSchema: Schema<Order> = new Schema({
    userWhoOrdered: { type: String, required: [true, "User who ordered is required"] },
    orderItems: { type: [], required: [true, "Order items are required"] },
    orderTotal: { type: Number, required: [true, "Order total is required"] },
    orderDate: { type: Date, required: [true, "Order date is required"] },
    orderStatus: { type: String, required: [true, "Order status is required"] },
    payMethod: { type: String, required: [true, "Payment method is required"] },
    payStatus: { type: String, required: [true, "Payment status is required"] },
});

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", OrderSchema);
module.exports = OrderModel;