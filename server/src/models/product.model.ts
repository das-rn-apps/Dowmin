import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  productId: number;
  description: string;
  image: string;
  price: number;
  category: string;
  inStock: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    productId: { type: Number, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 🧠 Auto-increment productId before save
productSchema.pre<IProduct>("save", async function (next) {
  if (this.isNew) {
    const lastProduct = await Product.findOne()
      .sort({ productId: -1 })
      .select("productId")
      .lean();
    this.productId = lastProduct ? lastProduct.productId + 1 : 1;
  }
  next();
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
