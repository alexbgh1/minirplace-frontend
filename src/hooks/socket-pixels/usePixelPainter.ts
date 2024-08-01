import { useRef, useEffect, useCallback } from "react";
import { isValidCanvasContext, getBigPixelToPaint } from "../../utils/canvas-utils";

const usePixelPainter = (canvasSize: number, pixelSize: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { canvas, context } = isValidCanvasContext(canvasRef);
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasSize]);

  const paintFromQuadrantPixels = useCallback(
    /*
     * Paints a pixel from the given x and y quadrants
     * @param xQuadrant - The x quadrant
     * @param yQuadrant - The y quadrant
     * @param color - The color to paint the pixel
     */

    (xQuadrant: number, yQuadrant: number, color: string = "#123123") => {
      const { context } = isValidCanvasContext(canvasRef);
      const xBigPixel = xQuadrant * pixelSize;
      const yBigPixel = yQuadrant * pixelSize;
      context.fillStyle = color;
      context.fillRect(xBigPixel, yBigPixel, pixelSize, pixelSize);
    },
    [pixelSize]
  );

  const paintPixel = useCallback(
    /*
     * Paints a pixel from the given x and y
     * @param x - The x coordinate
     * @param y - The y coordinate
     * @param color - The color to paint the pixel
     */
    (x: number, y: number, color: string = "#123123") => {
      const { context } = isValidCanvasContext(canvasRef);
      const { x: xPixelPosition, y: yPixelPosition } = getBigPixelToPaint(x, y, pixelSize);

      context.fillStyle = color;
      context.fillRect(xPixelPosition, yPixelPosition, pixelSize, pixelSize);
    },
    [pixelSize]
  );

  return { canvasRef, paintFromQuadrantPixels, paintPixel };
};

export default usePixelPainter;
