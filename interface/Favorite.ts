import { Product } from "@/interface/Product";

export interface Favorite {
  _id: string;
  user_id: string;
  product_id: Product;
  is_favorite: boolean;
  createdAt: string;
  updatedAt: string;
}
