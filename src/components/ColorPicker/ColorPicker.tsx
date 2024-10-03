import { useState, useContext, useRef } from "react";
import { useColors } from "../../hooks/useColors";

import SocketContext from "../../context/socket-context";
import Color from "./Color";

import { Color as ColorProps } from "../../types/Color";
import { FRONTEND_PREFIX } from "../../constants/prefix";

const ColorPicker = () => {
  const { SocketDispatch } = useContext(SocketContext);
  const { loading, colors } = useColors();

  const soundRef = useRef<HTMLAudioElement | null>(null);

  const [selectedColor, setSelectedColor] = useState<ColorProps | null>(null);

  const handleColorClick = (color: ColorProps | null) => {
    setSelectedColor(color);
    SocketDispatch({ type: "set_color", payload: color ? color : ({} as ColorProps) });

    if (soundRef.current) {
      soundRef.current.play();
      soundRef.current.currentTime = 0;
    }
  };

  return (
    <section className="flex flex-row items-center justify-center gap-1 mt-2 mb-8">
      <audio ref={soundRef} src={`${FRONTEND_PREFIX}/sounds/pixel-action-select.mp3`} />
      {loading ? (
        <p>Loading colors...</p>
      ) : (
        <>
          <Color
            selectedColor={selectedColor}
            handleColorClick={handleColorClick}
            color={{ id: "empty", hex: "#000000", name: "Empty" }}
            empty
          />
          {colors.map((color) => (
            <Color selectedColor={selectedColor} handleColorClick={handleColorClick} key={color.id} color={color} />
          ))}
        </>
      )}
    </section>
  );
};

export default ColorPicker;
