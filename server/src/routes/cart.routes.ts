import express from "express";
import { getCart, updateCart } from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, getCart);
router.put("/", protect, updateCart);

export default router;
