import { BACKEND_URL } from "./server";

import { Pixel } from "../types";

export const getPixelByQuadrant = async (xQudrant: number, yQuadrant: number, user?: boolean): Promise<Pixel> => {
  const response = await fetch(BACKEND_URL + "/api/pixel/" + xQudrant + "/" + yQuadrant + (user ? "?user=true" : ""));
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get pixel");
  }
  return data;
};
