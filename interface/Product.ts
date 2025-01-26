import { Address } from "./Address";


export interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  discount: number;
  category: string;
  detail: string;
  amount: number;
  sale_out: number;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;

}

export interface CartItem {
  _id: string;
  cart_id: string;
  user_id: string;
  product_id: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartWithAddress {
  cart: CartItem[];
  address: Address;
}
