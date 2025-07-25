import { Request, Response } from "express";
import { Order } from "../models/order.model";

export const placeOrder = async (req: Request, res: Response) => {
  const { items, totalAmount } = req.body;

  const order = await Order.create({
    user: req.user?._id,
    items,
    totalAmount,
    paymentStatus: "pending",
    status: "processing",
  });

  res.status(201).json(order);
};

export const getMyOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user?._id }).populate(
    "items.product"
  );
  res.json(orders);
};

export const getAllOrders = async (_: Request, res: Response) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
};
