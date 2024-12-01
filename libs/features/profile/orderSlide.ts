import {
  Order,
} from "@/app/profile/order/components/Order.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderSlideState {
  activeStatus: string;
  ordersLists: Order[];
  totalOrders: number;
  totalPage: number;
  currentPage: number;
}

const initialState: OrderSlideState = {
  activeStatus: "",
  ordersLists: [],
  totalOrders: 0,
  totalPage: 0,
  currentPage: 1,
};

const orderSlide = createSlice({
  name: "orderSlide",
  initialState,
  reducers: {
    updateOrders(state, action: PayloadAction<Order[]>) {
      state.ordersLists = action.payload;
    },
    updatePage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { updateOrders, updatePage } = orderSlide.actions;
export default orderSlide.reducer;
