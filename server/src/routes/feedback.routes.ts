import express from "express";
import {
  addFeedback,
  getAllFeedback,
} from "../controllers/feedback.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, addFeedback);
router.get("/", getAllFeedback); // Public

export default router;
