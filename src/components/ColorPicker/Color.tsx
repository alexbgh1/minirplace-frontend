import { Color as IColor } from "../../types/Color";
interface ColorProps {
  selectedColor: IColor | null;
  handleColorClick: (color: { id: string; hex: string; name: string } | null) => void;
  color: IColor;
  empty?: boolean;
}
const Color = ({ selectedColor, handleColorClick, color, empty }: ColorProps) => {
  const isSelected = selectedColor?.id === color.id;
  if (empty) {
    // Special case for empty color
    return (
      <button
        onClick={() => handleColorClick(null)}
        className={`relative bg-transparent
            backdrop-filter backdrop-blur-sm border border-gray-300/50
          w-8 h-8 transition duration-300 ease-in-out rounded-full cursor-pointer hover:scale-110
        ${isSelected ? "scale-110" : ""}`}
      >
        {/* Slash in the middle diagonal */}
        <div className="w-4 h-0.5 bg-gray-300/50 transform -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <span className="sr-only">Select empty color</span>
      </button>
    );
  }

  const srOnly = isSelected ? `Selected color: ${color.name}` : `Select color: ${color.name}`;
  return (
    <button
      onClick={() => handleColorClick(color)}
      className={`relative w-8 h-8 transition duration-300 ease-in-out rounded-full cursor-pointer hover:scale-110
        ${isSelected ? "scale-110" : ""}`}
      style={{ backgroundColor: color.hex }}
    >
      {/* popup effect */}
      <span
        className={`
          transition-all duration-300 ease-in-out  overflow-hidden
          absolute bottom-0 left-0 right-0 flex items-center justify-center  text-xs font-bold rounded-full text-white/90 top-7 ${
            isSelected ? "h-8 bg-opacity-70" : "h-0"
          }`}
      >
        {isSelected ? "✓" : ""}
      </span>
      <span className="sr-only">{srOnly}</span>
    </button>
  );
};

export default Color;
