export const isValidCanvas = (canvas: HTMLCanvasElement | null): canvas is HTMLCanvasElement => {
  return canvas !== null;
};

export const isValidContext = (context: CanvasRenderingContext2D | null): context is CanvasRenderingContext2D => {
  return context !== null;
};

export const isValidCanvasContext = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  if (!isValidCanvas(canvas)) throw new Error("Canvas ref not found");
  const context = canvas.getContext("2d");
  if (!isValidContext(context)) throw new Error("2d context not supported");
  return {
    canvas,
    context,
  };
};

export const getQuadrantPixelPosition = (x: number, y: number, pixelSize: number) => {
  /**
   * Get the position of the big-pixel in the canvas
   * @param x - The x coordinate
   * @param y - The y coordinate
   * @param pixelSize - The size of the big-pixel
   * @returns The position of the big-pixel in the canvas
   */
  const bigXPosition = Math.floor(x / pixelSize); // - x position of the big-pixel: 0, 1, 2, 3, 4, ...
  const bigYPosition = Math.floor(y / pixelSize); // - y position of the big-pixel: 0, 1, 2, 3, 4, ...
  // Return quadrant position
  return { x: bigXPosition, y: bigYPosition };
};

export const getBigPixelToPaint = (x: number, y: number, pixelSize: number) => {
  /**
   * Get the position of the big-pixel in the canvas in normal pixels
   * @param x - The x coordinate
   * @param y - The y coordinate
   * @param pixelSize - The size of the big-pixel
   * @returns The position of the big-pixel in the canvas
   */
  const { x: bigXPosition, y: bigYPosition } = getQuadrantPixelPosition(x, y, pixelSize);
  const xPixelPosition = bigXPosition * pixelSize; // - x position of the big-pixel in normal pixels: 0, 17, 34, 51, 68, ...
  const yPixelPosition = bigYPosition * pixelSize; // - y position of the big-pixel in normal pixels: 0, 17, 34, 51, 68, ...

  return { x: xPixelPosition, y: yPixelPosition };
};

/** To be more clear about pixel, big-pixel and quadrant-pixel:
 * pixel: The smallest unit of the canvas [1x1] -> 0 to width size
 * big-pixel / quadrant: A group of pixels [17x17] -> 0 to width size / 17 (pixelSize)
 * xPixelPosition: The x position of the big-pixel in normal pixels [17x17] -> 0, 17, 34, 51, 68, ...
 *  this is the 'start' position of the big-pixel in normal pixels, it is used to paint the big-pixel
 */
