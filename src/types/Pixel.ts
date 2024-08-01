import { User, Color } from "./index";

export interface Pixel {
  id: string;
  xQuadrant: number;
  yQuadrant: number;
  color: Color;
  user?: User | null;
  stats?: PixelStats;
  updatedAt: Date;
}

export interface PixelStats {
  id: string;
  count: number;
}
