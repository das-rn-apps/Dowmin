import { create } from "zustand";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (item) => {
    const items = [...get().items];
    const index = items.findIndex((i) => i.productId === item.productId);

    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },

  removeFromCart: (productId) => {
    const items = get().items.filter((i) => i.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(items));
    set({ items });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },
}));
