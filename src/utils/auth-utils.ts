import { jwtDecode } from "jwt-decode";

import { DecodedToken } from "../types/JwtPayload";

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp !== undefined && decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
export const getDecodedTokenInfo = (token: string) => {
  if (!token) return null;

  if (isTokenExpired(token)) {
    console.error("Token is expired");
    return null;
  }

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
