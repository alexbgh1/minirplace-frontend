import { useRef, useState, useContext } from "react";
import { toast } from "sonner";

import SocketContext from "../../context/socket-context";
import { useAuth } from "../../context/auth-context";

import { timeAgo } from "../../utils/time-utils";
import { isTokenExpired } from "../../utils/auth-utils";

import { PixelStats, User } from "../../types";

import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

const UpdatePixel = () => {
  const { SocketState, SocketDispatch } = useContext(SocketContext);
  const { user } = useAuth();

  const soundRef = useRef<HTMLAudioElement | null>(null);
  const [isCardOpen, setIsCardOpen] = useState(true);

  const toggleCard = () => {
    setIsCardOpen((prev) => !prev);
  };

  if (!SocketState.selectedPixel || Object.keys(SocketState.selectedPixel).length === 0) return null;

  const { xQuadrant, yQuadrant, updatedAt } = SocketState.selectedPixel;
  const { hex } = SocketState.selectedPixel.color;

  const { count } = SocketState.selectedPixel.stats as PixelStats;
  const selectedColor = SocketState.color;

  // updated: 1 minute ago, 1 hour ago, 1 day ago, 1 week ago, 1 month ago, 1 year ago...
  const dateDifference = timeAgo(new Date(updatedAt));

  const handleClick = async () => {
    if (SocketState.socket) {
      if (!selectedColor || Object.keys(selectedColor).length === 0) {
        toast.error("Please select a color to paint");
        return;
      }

      if (!SocketState.selectedPixel || Object.keys(SocketState.selectedPixel).length === 0) {
        toast.error("Please select a pixel to paint");
        return;
      }

      // Check if has valid token
      if (!localStorage.getItem("token")) {
        toast.error("Please login to paint");
        return;
      }

      if (isTokenExpired(localStorage.getItem("token"))) {
        toast.error("Token has expired, please login again");
        return;
      }

      const colorId = selectedColor.id;
      const pixelId = SocketState.selectedPixel.id;
      const payload = {
        colorId: colorId,
        id: pixelId,
      };

      // update visually selectedPixel: user & color
      SocketDispatch({
        type: "set_selected_pixel",
        payload: {
          ...SocketState.selectedPixel,
          stats: { ...SocketState.selectedPixel.stats!, count: Number(count) + 1 },
          updatedAt: new Date(),
          user: user,
          color: selectedColor,
        },
      });

      // Communicate with the server so other users can see the updated pixel
      SocketState.socket.emit("update-pixel", payload);

      if (soundRef.current) {
        soundRef.current.play();
        soundRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="pb-16">
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 right-0 w-80
      transition-all duration-300 ease-in-out
      flex flex-col items-center p-4 border border-b-0 rounded-lg rounded-b-none shadow-md bg-black/75 border-gray-50/20
      ${isCardOpen ? "h-24 pb-24 opacity-100" : "h-6 pb-6 opacity-50"}
        `}
      >
        <audio ref={soundRef} src="/sounds/pixel-action-paint.mp3" />
        <section className="flex w-full">
          {/* Card Header*/}
          <div className="w-16">
            <CardHeader xQuadrant={xQuadrant} yQuadrant={yQuadrant} hex={selectedColor.hex || hex} />
          </div>

          {/* Card Body */}
          <div className="w-full pl-6">
            <CardBody user={SocketState.selectedPixel.user as User} dateDifference={dateDifference} count={count} />

            {/* Paint pixel Action */}
            <button
              onClick={handleClick}
              style={{
                backgroundColor: selectedColor.hex ? selectedColor.hex + "a0" : "rgb(30,25,25)",
              }}
              className="px-2 py-0.5 text-sm text-white bg-smooth-black rounded-md hover:bg-smooth-black/80"
            >
              Paint pixel
            </button>
          </div>
          <div className="absolute top-1 right-4">
            <button onClick={toggleCard} className="text-white">
              {isCardOpen ? "close" : "open"}
            </button>
          </div>
        </section>
        {/* End Card */}
      </div>
    </div>
  );
};

export default UpdatePixel;
