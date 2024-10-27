import { jwtVerify } from "jose";

export const decryptToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    console.error("Token decryption error:", error);
    return null; // Return null or handle the error as needed
  }
};
