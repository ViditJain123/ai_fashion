import mongoose, { Schema, Document, Model, mongo } from "mongoose";

export interface Seller extends Document {
  personalInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  aadharNum: string;
  businessInfo: {
    businessName: string;
    businessAdd: string;
    city: string;
    state: string;
    pinCode: string;
    logoImage: string;
    bannerImage: string;
    businessThemeColor: string;
  };
  otherInfo: {
    panNumber: string;
    gstin: string;
    taxId: string;
    registrationNumber: string;
  };
  bankDetails: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
  };
  verification: {
    isVerified: boolean;
    verificationStatus: string;
    verificationExpiry: Date;
  };
  products: mongoose.Schema.Types.ObjectId;
}

const SellerSchema: Schema<Seller> = new Schema({
  personalInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  address: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
  },
  aadharNum: { type: String, required: true },
  businessInfo: {
    businessName: { type: String, required: true },
    businessAdd: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    logoImage: { type: String, required: true },
    bannerImage: { type: String, required: true },
    businessThemeColor: {type: String, required: true}
  },
  otherInfo: {
    panNumber: { type: String, required: true },
    gstin: { type: String, required: true },
    taxId: { type: String, required: true },
    registrationNumber: { type: String, required: true },
  },
  bankDetails: {
    accountHolderName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true },
  },
  verification: {
    isVerified: { type: Boolean, required: true },
    verificationStatus: { type: String, required: true },
    verificationExpiry: { type: Date, required: true },
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: "True",
  },
});

const SellerModel: Model<Seller> =
  (mongoose.models.Seller as Model<Seller>) ||
  mongoose.model<Seller>("Seller", SellerSchema);

export default SellerModel;
