export interface ProductImage {
  image_url: string;
  public_id: string;
}

export interface Product {
  _id: string;
  name: string;
  images: ProductImage[];
  price: number;
  discount: number;
  category: string;
  detail: string;
  amount: number;
  sale_out: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string;
  cart_id: string;
  user_id: string;
  product_id: Product;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Address {
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
  __v: number;
}

export interface CartWithAddress {
  cart: CartItem[];
  address: Address;
}
