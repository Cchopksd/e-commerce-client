import { User } from "./User";

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
