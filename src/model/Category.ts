import mongoose, { Schema, Document } from "mongoose";

export interface Category extends Document {
  name: string;
  description: string;
}

const CategorySchema: Schema<Category> = new Schema({
  name: { type: String, required: [true, "Category name is required"] },
  description: {
    type: String,
    required: [true, "Category description is required"],
  },
});

const CategoryModel =
  (mongoose.models.Category as mongoose.Model<Category>) ||
  mongoose.model<Category>("Category", CategorySchema);
module.exports = CategoryModel;
