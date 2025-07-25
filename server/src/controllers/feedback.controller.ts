import { Request, Response } from "express";
import { Feedback } from "../models/feedback.model";

export const addFeedback = async (req: Request, res: Response) => {
  const { message, rating } = req.body;

  const feedback = await Feedback.create({
    user: req.user?._id,
    message,
    rating,
  });

  res.status(201).json(feedback);
};

export const getAllFeedback = async (_: Request, res: Response) => {
  const feedbacks = await Feedback.find().populate("user", "name");
  res.json(feedbacks);
};
