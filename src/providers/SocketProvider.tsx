import React, { useState, PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

import { useSocket } from "../hooks/socket-pixels/useSocket";
import { usePixels } from "../hooks/socket-pixels/usePixels";

import { SocketContextProvider } from "../context/socket-context";
import { Pixel } from "../types/Pixel";
import { BACKEND_URL } from "../services/server";
import { WS_ERRORS } from "../constants/ws-errors";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextProv: React.FunctionComponent<ISocketContextComponentProps> = (props) => {
  const { children } = props;

  const { SocketState, SocketDispatch } = usePixels();

  const [loading, setLoading] = useState<boolean>(true);

  const urlSocket = BACKEND_URL;
  const socket = useSocket(urlSocket, {
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
    autoConnect: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWSError = (error: any) => {
    console.log(error);
    if (error.error && error.message) {
      if (WS_ERRORS[error.error as keyof typeof WS_ERRORS]) {
        const message = error.message;
        toast.error(message);
        return;
      }
    }
    console.error("WS Error: ", error);
    toast.error("An unexpected error occurred");
  };

  useEffect(() => {
    StartHandshake();
    StartListeners();

    return () => {
      socket.disconnect();
    };
  }, []);

  const StartListeners = () => {
    // Update-pixels: Update all pixels, e.g. initial load
    socket.on("update-pixels", (pixels: Pixel[]) => SocketDispatch({ type: "update_pixels", payload: pixels }));

    // Update-pixel: Update a single pixel but also update the pixel in the pixels array
    socket.on("update-pixel", (pixel: Pixel) => SocketDispatch({ type: "update_pixel", payload: pixel }));

    // Update-users: Update the number of users connected
    socket.on("update-users-length", (usersLength: number) =>
      SocketDispatch({ type: "update_users_length", payload: usersLength })
    );

    socket.io.on("error", (error) => {
      console.error("Socket error: ", error);
    });
    socket.on("error", (error) => {
      handleWSError(error);
    });
  };

  const StartHandshake = () => {
    socket.on("connect", () => {
      SocketDispatch({ type: "update_socket", payload: socket });
      if (socket.id) {
        SocketDispatch({ type: "update_uid", payload: socket.id });
      }
    });

    setLoading(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return <SocketContextProvider value={{ socket, SocketState, SocketDispatch }}>{children}</SocketContextProvider>;
};

export default SocketContextProv;
