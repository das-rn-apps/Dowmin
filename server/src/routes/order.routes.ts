import express from "express";
import {
  getMyOrders,
  placeOrder,
  getAllOrders,
} from "../controllers/order.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, adminOnly, getAllOrders); // Admin view

export default router;
