import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpire: Date;
  verified: boolean;
  orderHistory: Number[];
  cart: string[];
  role: "user" | "admin";
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  password: { type: String, required: [true, "password is required"] },
  verifyCode: { type: String, required: [true, "verifyCode is required"] },
  verifyCodeExpire: {
    type: Date,
    required: [true, "verifyCodeExpire is required"],
  },
  verified: { type: Boolean, default: false },
  orderHistory: { type: [Number], required: true },
  cart: { type: [String], required: true },
  role: { type: String, required: true, enum: ["user", "admin"] },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
module.exports = UserModel;
