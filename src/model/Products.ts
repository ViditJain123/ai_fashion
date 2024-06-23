import mongoose, { Schema, Document, Model, mongo } from "mongoose";
import { string } from "zod";

export interface Offers extends Document{
    productId: mongoose.Schema.Types.ObjectId;
    offerTitle: String;
    offerDiscountPercent: Number;
}

const OfferSchema: Schema<Offers> = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    offerTitle: {
        type: String,
        required: [true, "OfferTitle is required"],
    },
    offerDiscountPercent: {
        type: Number,
        required: [true,"offerDiscountPercent is required"]
    }
})

export interface rating extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    review: String;
    rating: Number;
}

const RatingSchema: Schema<rating> = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
    },
})

export interface Specs extends Document{
    productId: mongoose.Schema.Types.ObjectId;
    color: String;
    stock: Number;
    images: String[];
    sellingPrice: Number;
    offers: Offers[];
    rating: rating[];
    costPrice: Number;
}

const SpecsSchema: Schema<Specs> = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    color: {
        type: String,
        required: [true, "Color is required!"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        default: 0,
    },
    images: {
        type: [String],
        required: [true, "Images are required"],
    },
    sellingPrice: {
        type: Number,
        required: [true, "SellingPrice is required"],
    },
    offers: {
        type: [OfferSchema],
        default: [],
    },
    rating: {
        type: [RatingSchema],
        default: [],
    },
    costPrice: {
        type: Number,
        required: [true, "CostPrice is required"],
    },
});


export interface Product extends Document{
    productName: string;
    productCategory: mongoose.Schema.Types.ObjectId;
    productDesc: string;
    specs: Specs[];
}

const ProductSchema: Schema<Product> = new Schema({
    productName: {
        type: String,
        required: [true, "ProductName is required"],
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "ProductCategory is required"],
    },
    productDesc: {
        type: String,
        required: [true, "ProductDesc is required"],
    },
    specs: {
        type: [SpecsSchema],
        required: [true, "Specs are required"],
    },
});

const ProductModel = (mongoose.models.Product as Model<Product>) || mongoose.model<Product>("Product", ProductSchema);
export default ProductModel;