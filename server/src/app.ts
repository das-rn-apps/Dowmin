import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import feedbackRoutes from "./routes/feedback.routes";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/feedback", feedbackRoutes);

export default app;
