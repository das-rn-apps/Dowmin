import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json(product);
};
