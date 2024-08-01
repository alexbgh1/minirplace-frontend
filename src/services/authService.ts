import { UserLoginDto, UserRegisterDto, User } from "../types/User";
import { BACKEND_URL } from "./server";

export const login = async (user: UserLoginDto): Promise<User> => {
  const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    if (Array.isArray(data.message)) {
      // Throw an error with the first message
      throw new Error(data.message[0]);
    }

    throw new Error(data.message || "Failed to login");
  }
  return data;
};

export const logout = async (): Promise<void> => {};

export const register = async (user: UserRegisterDto): Promise<User> => {
  const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) {
    if (Array.isArray(data.message)) {
      // Throw an error with the first message
      throw new Error(data.message[0]);
    }

    throw new Error(data.message || "Failed to register");
  }
  return data;
};
