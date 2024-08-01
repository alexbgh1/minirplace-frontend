export interface CanvasConfig {
  id: number;
  name: string;
  devices: Device[];
}

export interface Device {
  id: number;
  name: string;
  width: number;
  height: number;
  pixelSize: number;
}

export type CanvasMobileSize = 340;
export type CanvasDesktopSize = 510;
export type CanvasViewSize = CanvasMobileSize | CanvasDesktopSize;

interface CanvasPixelSize {
  mobile: 20; // - Mobile: Proportional to the canvas size (340 / 20 = 17) | (size / pixelSize = 17 'big-pixels')
  desktop: 30; // - Desktop: Proportional to the canvas size (510 / 30 = 17) | (size / pixelSize = 17 'big-pixels')
}

export const CANVAS_PIXEL_SIZE: CanvasPixelSize = {
  mobile: 20,
  desktop: 30,
} as const;

export const CANVAS_SIZE = {
  mobile: 340,
  desktop: 510,
} as const;

export const CANVAS_N_BIG_PIXELS = {
  mobile: CANVAS_SIZE.mobile / CANVAS_PIXEL_SIZE.mobile,
  desktop: CANVAS_SIZE.desktop / CANVAS_PIXEL_SIZE.desktop,
} as const;

export const CANVAS_BACKGROUND_BOARD = "#FFFFFF";

/*
To create a PixelBoard we need to imagine a "giant grid of big-pixels", each 'big-pixel' has a size of CANVAS_PIXEL_SIZE
CANVAS_PIXEL_SIZE has two values: mobile and desktop, and those values are proportional to the CANVAS_SIZE values.

Values depends on the device screen size Mobile (340px) and Desktop (510px).
- Mobile: Proportional to the canvas size (340 / 20 = 17) | (canvasSize / pixelSize = 17 'big-pixels')
- Desktop: Proportional to the canvas size (510 /30 = 17) | (canvasSize / pixelSize = 17 'big-pixels')

The division is expected to be a common divisor, so we can have a grid of 'big-pixels' that fits the canvas size perfectly.

2x2 grid of 'big-pixels' 
|     |<-L->|   
---------------------
|     |     |     

So, in this case 'L' is the size of the 'big-pixel'.
If it is mobile, the size of the 'big-pixel' is 17px * 17px
and if it is desktop, the size of the 'big-pixel' is 30px * 30px

*/
