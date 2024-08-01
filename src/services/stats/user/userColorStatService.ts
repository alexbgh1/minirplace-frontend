import { BACKEND_URL } from "../../server";

import { UserColorStat } from "../../../types";

export const getUserColorStat = async (): Promise<UserColorStat[]> => {
  const response = await fetch(`${BACKEND_URL}/api/colors/pixel-stats/most-colored-pixels`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user color stat");
  }
  return data;
};
