import { Product } from "./Product";

export interface OrderResponse {
  total_items: number;
  total_pages: number;
  page_now: number;
  orders: Order;
}

export interface Order {
  _id: string;
  user_id: string;
  payment_id: string;
  status: OrderStatus;
  shipping_address: ShippingAddress[] | null | string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface ShippingAddress {
  _id: string;
  name: string;
  user_id: string;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
  default: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  _id: string;
  order_id: string;
  product_id: Product;
  quantity: number;
  price_at_purchase: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum OrderStatus {
  All = "all",
  Unpaid = "unpaid",
  Paid = "paid",
  InProcess = "in-process",
  Cancelled = "cancelled",
  Delivering = "delivering",
  Delivered = "delivered",
  Refunded = "refunded",
  Failed = "failed",
  Successfully = "successfully",
}
