import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  inStock: boolean;
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
