// src/store/orderStore.ts
import { create } from "zustand";
import axios from "../utils/axios";

export interface Order {
  _id: string;
  user: { name: string };
  items: {
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
}

interface OrderState {
  orders: Order[];
  fetchOrders: () => Promise<void>;
  setOrders: (orders: Order[]) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  fetchOrders: async () => {
    try {
      const res = await axios.get("/orders");
      set({ orders: res.data });
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  },
}));
