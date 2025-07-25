import express from "express";
import { getAllProducts, addProduct } from "../controllers/product.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, adminOnly, addProduct); // Admin only

export default router;
