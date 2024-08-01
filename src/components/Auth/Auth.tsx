import { useState } from "react";
import { useAuth } from "../../context/auth-context";

import Login from "./Login";
import Signup from "./Signup";

import MostUsedColors from "../MostUsedColors";

const Auth = () => {
  const { user, handleLogout } = useAuth();
  const [switchIsLogin, setSwitchIsLogin] = useState<boolean>(true);
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">You are already logged in!</h2>
          <small>
            <strong>Username:</strong> {user.username}
          </small>
          <button className="switch-button" onClick={handleLogout}>
            Logout
          </button>
          <MostUsedColors />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center gap-4 mb-8  max-w-[350px]">
      <div>
        <button className={`switch-button ${switchIsLogin ? "active" : ""}`} onClick={() => setSwitchIsLogin(true)}>
          Login
        </button>
        <button className={`switch-button ${!switchIsLogin ? "active" : ""}`} onClick={() => setSwitchIsLogin(false)}>
          Register
        </button>
      </div>
      {switchIsLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default Auth;
