import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import orderSlide from "./features/profile/orderSlide";
import sidebarSlice from "./features/admin/sidebarSlice";
import manageOrderSlice from "./features/admin/manageOrderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      orders: orderSlide,
      admin: sidebarSlice,
      manageOrder: manageOrderSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
