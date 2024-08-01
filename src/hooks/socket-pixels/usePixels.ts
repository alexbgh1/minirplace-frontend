import { useEffect, useReducer } from "react";

import { SocketReducer, defaultSocketContextState } from "../../context/socket-context";

export const usePixels = () => {
  const [SocketState, SocketDispatch] = useReducer(SocketReducer, defaultSocketContextState);

  useEffect(() => {
    const getPixels = async () => {
      const response = await fetch(process.env.BACKEND_URL + "/api/pixel");
      const pixels = await response.json();

      SocketDispatch({ type: "update_pixels", payload: pixels });
      /* This is the only place where this action is dispatched */
      SocketDispatch({
        type: "set_is_pixels_loaded",
        payload: true,
      });
    };
    getPixels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SocketState.isPixelsLoaded]);

  return { SocketState, SocketDispatch };
};
