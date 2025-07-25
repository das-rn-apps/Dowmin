import express from "express";
import { getAllProducts, addProduct } from "../controllers/product.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";
import upload from "../middleware/multer";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, adminOnly, upload.single("image"), addProduct); // Admin only

export default router;
