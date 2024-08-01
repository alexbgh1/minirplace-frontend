import PixelBoard from "./PixelBoard";
import TotalUsers from "./TotalUsers";

import SoundPlayer from "../components/SoundPlayer/SoundPlayer";

const MiniRPlace = () => {
  return (
    <div className="relative">
      <PixelBoard />
      <div className="flex items-center justify-between">
        <SoundPlayer />
        <TotalUsers />
      </div>
    </div>
  );
};

export default MiniRPlace;
