import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface Category extends Document {
    categoryName: String;
    categoryDescription: String;
}

const CategorySchema: Schema<Category> = new Schema({
    categoryName: {
        type: String,
        required: [true, "Category Name is required"],
    },
    categoryDescription: {
        type: String,
        required: [true, "Category Description is required"],
    },
})

const CategoryModel =
    (mongoose.models.Category as mongoose.Model<Category>) ||
    mongoose.model<Category>("Category", CategorySchema);

module.exports = CategoryModel;