import { Request, Response } from "express";
import { Cart } from "../models/cart.model";

export const getCart = async (req: Request, res: Response) => {
  const cart = await Cart.findOne({ user: req.user?._id }).populate(
    "items.productId"
  );
  res.json(cart || { items: [] });
};

export const updateCart = async (req: Request, res: Response) => {
  const { items } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: req.user?._id },
    { items },
    { new: true, upsert: true }
  );
  res.json(cart);
};
