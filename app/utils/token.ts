import { jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

export interface DecodedToken extends JWTPayload {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  sub: string;
  profile_picture: string;
  role: string;
  iat: number;
  exp: number;
}

export const decryptToken = async (
  token: string | null,
): Promise<DecodedToken | undefined> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    if (token) {
      const { payload } = await jwtVerify(token, secret);
      return payload as DecodedToken;
    }
  } catch (error) {
    console.error("Token decryption error:", error);
    return undefined;
  }
};

export const getToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) {
      return null;
    }
    return token;
  } catch (error) {
    console.log("Token decryption error:", error);
    return null;
  }
};
