/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { getDecodedTokenInfo } from "../utils/auth-utils";

import { AuthContext } from "../context/auth-context";

import { User, UserLoginDto, UserRegisterDto } from "../types/User";

import { login, register } from "../services/authService";
import { getUser } from "../services/userService";

import SocketContext from "../context/socket-context";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const updateUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const decodedToken = getDecodedTokenInfo(token);
      if (!decodedToken) {
        localStorage.removeItem("token");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const fetchedUser = await getUser(decodedToken.id);
        setUser(fetchedUser);
      } catch (error: any) {
        toast.error(`Failed to fetch user data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    updateUserInfo();
  }, []);

  const updateSocketToken = (token: string) => {
    if (socket.connected) {
      socket.disconnect();

      if (socket.io && socket.io.opts && socket.io.opts.extraHeaders) {
        socket.io.opts.extraHeaders.Authorization = `Bearer ${token}`;
      }

      // socket.io.opts.extraHeaders.Authorization = `Bearer ${token}`;
      socket.connect();
    }
  };

  const handleLogin = async (userLoginDto: UserLoginDto) => {
    try {
      const loggedInUser = await login(userLoginDto);
      setUser(loggedInUser);
      localStorage.setItem("token", loggedInUser.token);

      // Reiniciar conexión con el socket
      updateSocketToken(loggedInUser.token);

      toast.success("Login successful!", { position: "top-right" });
    } catch (error: any) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful!", { position: "top-right" });
  };

  const handleRegister = async (userRegisterDto: UserRegisterDto) => {
    try {
      const registeredUser = await register(userRegisterDto);
      setUser(registeredUser);
      localStorage.setItem("token", registeredUser.token);

      // Reiniciar conexión con el socket
      updateSocketToken(registeredUser.token);

      toast.success("Registration successful!", { position: "top-right" });
    } catch (error: any) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Muestra un indicador de carga mientras se obtienen los datos
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
