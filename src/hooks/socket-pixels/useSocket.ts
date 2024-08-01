import { useEffect, useRef } from "react";
import io, { ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export const useSocket = (url: string, options?: Partial<ManagerOptions & SocketOptions>): Socket => {
  const token = localStorage.getItem("token");

  const socketRef = useRef<Socket>();
  if (!socketRef.current) {
    socketRef.current = io(url, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
  }

  useEffect(() => {
    const socket = socketRef.current;

    return () => {
      if (socket) socket.close();
    };
  }, []);

  return socketRef.current;
};
