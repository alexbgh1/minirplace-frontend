import { useContext, createContext } from "react";
import { User, UserLoginDto, UserRegisterDto } from "../types/User";

export interface AuthContextType {
  user: User | null;
  handleLogin: (user: UserLoginDto) => void;
  handleRegister: (user: UserRegisterDto) => void;
  handleLogout: () => void;
}

const defaultAuthContextState: AuthContextType = {
  user: null,
  handleLogin: () => {},
  handleRegister: () => {},
  handleLogout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextState);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
