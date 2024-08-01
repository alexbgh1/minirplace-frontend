import { Color, Pixel } from "../../types";

interface CardHeaderProps {
  xQuadrant: Pixel["xQuadrant"];
  yQuadrant: Pixel["yQuadrant"];
  hex: Color["hex"];
}

const CardHeader = ({ xQuadrant, yQuadrant, hex }: CardHeaderProps) => {
  return (
    <>
      <div className="w-16 h-16 rounded-full" style={{ backgroundColor: hex }}></div>
      <span className="flex justify-around max-w-16">
        <small className="tabular-nums">x: {xQuadrant}</small>
        <small className="tabular-nums">y: {yQuadrant}</small>
      </span>
    </>
  );
};

export default CardHeader;
