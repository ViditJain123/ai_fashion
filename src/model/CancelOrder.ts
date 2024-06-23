import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface CancelOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    order: mongoose.Schema.Types.ObjectId;
    reason: String;
    status: String;
}

const CancelOrderSchema: Schema<CancelOrder> = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    reason: {
        type: String,
        required: [true, "Reason is required"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
    },
})

const CancelOrderModel =
    (mongoose.models.CancelOrder as mongoose.Model<CancelOrder>) ||
    mongoose.model<CancelOrder>("CancelOrder", CancelOrderSchema);
export default CancelOrderModel;