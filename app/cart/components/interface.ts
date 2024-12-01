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

export interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
  role: string;
  profile_image: string;
}

export interface Address {
  _id: string;
  name: string;
  user_id: User;
  province: string;
  district: string;
  subdistrict: string;
  post_id: number;
  detail: string;
  default: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartWithAddress {
  cart: CartItem[];
  address: Address;
}
