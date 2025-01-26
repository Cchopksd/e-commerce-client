import { Order } from "@/interface/Order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ManageOrderState {
  options: string;
  ordersValue: Order[];
  totalPagesValue: number;
  currentPageValue: number;
  orderStatusValue: string;
  trackingNumberValue: string;
  shippingCompanyValue: string;
}

const initialState: ManageOrderState = {
  options: "all",
  ordersValue: [],
  totalPagesValue: 0,
  currentPageValue: 0,
  orderStatusValue: "",
  trackingNumberValue: "",
  shippingCompanyValue: "",
};

const manageOrderSlice = createSlice({
  name: "manageOrder",
  initialState,
  reducers: {
    updateOrders: (state, action: PayloadAction<Order[]>) => {
      state.ordersValue = action.payload;
    },
    updateOptions: (state, action: PayloadAction<string>) => {
      state.options = action.payload;
    },
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPagesValue = action.payload;
    },
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPageValue = action.payload;
    },

    updateOrderStatusValue: (state, action: PayloadAction<string>) => {
      state.orderStatusValue = action.payload;
    },

    updateDelivering: (
      state,
      action: PayloadAction<{
        trackingNumber: string;
        shippingCompany: string;
      }>,
    ) => {
      state.trackingNumberValue = action.payload.trackingNumber;
      state.shippingCompanyValue = action.payload.shippingCompany;
    },
  },
});

export const {
  updateOrders,
  updateOptions,
  updateTotalPages,
  updateCurrentPage,
  updateOrderStatusValue,
  updateDelivering,
} = manageOrderSlice.actions;
export default manageOrderSlice.reducer;
