import { TokenType } from "../types/login-type";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";

export const saveUserToLocalStorage = (token: TokenType) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const decodeToken = () => {
  try {
    const token = getTokenFromLocalStorage();
    return jwtDecode(token as string);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
