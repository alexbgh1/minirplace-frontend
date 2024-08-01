import { useState, useEffect } from "react";
import { CANVAS_SIZE, CANVAS_PIXEL_SIZE, CanvasViewSize } from "../constants/canvas";

/**
 * Hook to get the canvas size and pixel size
 * @returns The canvas size and pixel size
 */
const useCanvasSize = () => {
  const [canvasSize, setCanvasSize] = useState<CanvasViewSize>(CANVAS_SIZE.desktop);
  const [pixelSize, setPixelSize] = useState<number>(CANVAS_PIXEL_SIZE.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCanvasSize(CANVAS_SIZE.mobile);
        setPixelSize(CANVAS_PIXEL_SIZE.mobile);
      } else {
        setCanvasSize(CANVAS_SIZE.desktop);
        setPixelSize(CANVAS_PIXEL_SIZE.desktop);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { canvasSize, pixelSize };
};

export default useCanvasSize;

//  This was supposed to work dinamically fetching the configuration from the server, but it was not implemented
