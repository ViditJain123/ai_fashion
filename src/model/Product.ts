import mongoose, { Schema, Document, Types } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Types.ObjectId;
  images: string[];
}

const ProductSchema: Schema<Product> = new Schema({
  name: { type: String, required: [true, "Product name is required"] },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: { type: Number, required: [true, "Product price is required"] },
  stock: { type: Number, required: [true, "Product stock is required"] },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Product category is required"],
  },
  images: { type: [String], required: [true, "Product images are required"] },
});

const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);
module.exports = ProductModel;
