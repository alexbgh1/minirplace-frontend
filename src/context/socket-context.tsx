import { createContext } from "react";
import { Socket } from "socket.io-client";

import { Pixel, Color } from "../types";

export interface ISocketContextState {
  socket: Socket | undefined;
  uid: string;
  pixel: Pixel;
  selectedPixel: Pixel;
  pixels: Pixel[] | [];
  color: Color;
  isPixelsLoaded: boolean;
  usersConnected: number;
  findPixel: (xQuadrant: number, yQuadrant: number) => Pixel;
  updatePixelAtIdx: (idx: number, pixel: Pixel) => void;
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  uid: "",
  pixel: {} as Pixel,
  selectedPixel: {} as Pixel,
  color: {} as Color,
  pixels: [],
  usersConnected: 0,
  isPixelsLoaded: false,
  findPixel: () => ({} as Pixel),
  updatePixelAtIdx: () => {},
};

export type TSocketContextActions =
  | "update_socket"
  | "update_uid"
  | "update_pixels"
  | "update_pixel"
  | "update_users_length"
  | "set_selected_pixel"
  | "set_pixel"
  | "set_color"
  | "set_is_pixels_loaded";

export type TSocketContextPayload = Pixel | Pixel[] | Color | number | string | Socket | boolean;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (state: ISocketContextState, action: ISocketContextActions): ISocketContextState => {
  // State management for socket context
  switch (action.type) {
    case "update_socket":
      return {
        ...state,
        socket: action.payload as Socket,
      };
    case "update_uid":
      return {
        ...state,
        uid: action.payload as string,
      };
    case "update_pixels":
      return {
        ...state,
        pixels: action.payload as Pixel[],
      };
    case "set_pixel":
      return {
        ...state,
        pixel: action.payload as Pixel,
      };
    case "set_selected_pixel":
      return {
        ...state,
        selectedPixel: action.payload as Pixel,
      };
    case "update_pixel":
      // Depends on socket event "update-pixel"
      // This manage the visual update of the pixel
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        pixels: state.pixels.map((pixel) =>
          pixel.id === (action.payload as Pixel).id ? (action.payload as Pixel) : pixel
        ),
        pixel: action.payload as Pixel,
      };
    case "update_users_length":
      return {
        ...state,
        usersConnected: action.payload as number,
      };
    case "set_color":
      return {
        ...state,
        color: action.payload as Color,
      };

    case "set_is_pixels_loaded":
      return {
        ...state,
        isPixelsLoaded: action.payload as boolean,
      };

    default:
      return state;
  }
};

export interface ISocketContextProps {
  socket: Socket;
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  socket: {} as Socket,
  SocketState: defaultSocketContextState,
  SocketDispatch: () => {},
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
