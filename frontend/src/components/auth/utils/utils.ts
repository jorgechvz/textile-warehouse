import { TokenType } from "../types/login-type";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";

export const saveUserToLocalStorage = (token: TokenType) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Add email to type in jwt-decode
export interface jwtDecode extends TokenType {
  email: string;
  role: string;
  iat: number;
  exp: number;
  userId: string;
  name: string;
}
export const decodeToken = () => {
  try {
    const token = getTokenFromLocalStorage();
    return jwtDecode(token as string) as jwtDecode;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
