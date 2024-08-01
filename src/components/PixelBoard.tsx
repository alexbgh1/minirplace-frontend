import { useEffect, useContext, useState } from "react";

import useCanvasSize from "../hooks/useCanvasSize";
import usePixelPainter from "../hooks/socket-pixels/usePixelPainter";

import SocketContext from "../context/socket-context";

import { getBigPixelToPaint, getQuadrantPixelPosition } from "../utils/canvas-utils";
import { getPixelByQuadrant } from "../services/pixelService";

const PixelBoard = () => {
  const { SocketState, SocketDispatch } = useContext(SocketContext);
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });

  const { canvasSize, pixelSize } = useCanvasSize();
  const { canvasRef, paintFromQuadrantPixels } = usePixelPainter(canvasSize, pixelSize);

  /** Paint all pixels */
  useEffect(() => {
    const paintAllPixels = async () => {
      SocketState.pixels.forEach((pixel) => {
        paintFromQuadrantPixels(pixel.xQuadrant, pixel.yQuadrant, pixel.color.hex);
      });
    };

    paintAllPixels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SocketState.isPixelsLoaded, canvasSize]);

  /** Paint individual Big Pixel */
  useEffect(() => {
    if (Object.keys(SocketState.pixel).length > 0) {
      const { xQuadrant, yQuadrant } = SocketState.pixel;
      paintFromQuadrantPixels(xQuadrant, yQuadrant, SocketState.pixel.color.hex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SocketState.pixel]);

  const handleClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const { x: bigXPosition, y: bigYPosition } = getQuadrantPixelPosition(x, y, pixelSize);
    const { x: xPixelPosition, y: yPixelPosition } = getBigPixelToPaint(x, y, pixelSize);
    setCoords({ x: xPixelPosition, y: yPixelPosition, active: true });

    const pixel = await getPixelByQuadrant(bigXPosition, bigYPosition);
    SocketDispatch({ type: "update_pixel", payload: pixel });
    SocketDispatch({ type: "set_selected_pixel", payload: pixel });
  };

  return (
    <>
      <canvas ref={canvasRef} onClick={handleClick} width={canvasSize} height={canvasSize}></canvas>
      {coords.active && (
        <div
          style={{
            left: coords.x,
            top: coords.y,
            width: pixelSize,
            height: pixelSize,
            backgroundColor: SocketState.color.hex,
          }}
          onClick={() => setCoords({ x: 0, y: 0, active: false })}
          className="absolute z-0 after:inset-0 after:absolute after:border after:w-full after:h-full after:border-dashed after:border-gray-950"
        ></div>
      )}
    </>
  );
};

export default PixelBoard;
