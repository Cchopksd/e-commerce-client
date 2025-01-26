import { Address } from "./Address";
import { CartItem } from "./Product";

export interface CartWithAddress {
  cart: CartItem[];
  address: Address;
}
