// controllers/product.controller.ts
import cloudinary from "../utils/cloudinary";
import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Upload to Cloudinary from buffer
    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as { secure_url: string });
          })
          .end(req.file?.buffer);
      }
    );

    const imageUrl = uploadResult.secure_url;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      image: imageUrl,
      inStock: true,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add product" });
  }
};
