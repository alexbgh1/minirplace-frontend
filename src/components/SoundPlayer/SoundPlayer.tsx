import { useState, useEffect } from "react";
import { SoundOffIcon, SoundOnIcon } from "../icons";

const SoundPlayer = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleSound = () => {
    setIsMuted(!isMuted);
    toggleMuteAllAudio(!isMuted);
  };

  const toggleMuteAllAudio = (mute: boolean) => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio: HTMLAudioElement) => {
      audio.muted = mute;
    });
  };

  useEffect(() => {
    // Ensure that the mute state is applied when the component mounts
    toggleMuteAllAudio(isMuted);
  }, [isMuted]);

  return (
    <div className="w-4 h-4 text-white left-3 bottom-3 text-inherit">
      <button onClick={toggleSound}>
        {isMuted ? (
          <SoundOffIcon className="w-4 h-4 text-white fill-white text-inherit" />
        ) : (
          <SoundOnIcon className="w-4 h-4 text-white fill-white text-inherit" />
        )}
      </button>
    </div>
  );
};

export default SoundPlayer;
