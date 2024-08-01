import { BACKEND_URL } from "./server";

import { User, DecodedToken } from "../types";

export const getUser = async (id: DecodedToken["id"]): Promise<User> => {
  const response = await fetch(`${BACKEND_URL}/api/users/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to get user");
  }
  return data;
};
