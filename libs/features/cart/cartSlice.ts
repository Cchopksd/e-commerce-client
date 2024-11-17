import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  images?: { image_url: string }[];
  amount: number;
}

interface CartItem {
  _id: string;
  product_id: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  value: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  value: 1,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },

    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (item) => item._id === action.payload.itemId,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    calculateTotal(state) {
      state.totalPrice = state.items.reduce((total, item) => {
        const price = item.product_id.discount || item.product_id.price;
        return total + price * item.quantity;
      }, 0);
    },
  },
});

export const {
  updateCart,
  addItem,
  removeItem,
  updateQuantity,
  calculateTotal,
  increment,
  decrement,
} = cartSlice.actions;

export default cartSlice.reducer;
