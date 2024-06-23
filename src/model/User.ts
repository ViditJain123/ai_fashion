import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface User extends Document {
  email: string;
  phoneNumber: number;
  password: string;
  verificationToken: string;
  verifyTokenExpire: Date;
  verified: boolean;
  orderHistory: mongoose.Schema.Types.ObjectId[];
  cart: Cart[];
}

export interface Cart extends Document{
  userId: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const CartSchema: Schema<Cart> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
})

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: { type: String, required: [true, "password is required"] },
  verified: { type: Boolean, default: false },
  verificationToken: {
    type: String,
    required: [true, "verifyCode is required"],
  },
  verifyTokenExpire: {
    type: Date,
    required: [true, "verifyTokenExpire is required"],
  },
  orderHistory: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Order",
    required: true,
  },
  cart: {
    type: [CartSchema],
    required: true
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
module.exports = UserModel;
