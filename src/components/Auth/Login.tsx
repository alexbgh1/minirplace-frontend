import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import { UserLoginDto } from "../../types/User";

const Login = () => {
  const { handleLogin } = useAuth();
  const [username, setUsername] = useState<UserLoginDto["username"]>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin({ username });
  };

  return (
    <form className="flex flex-row items-center gap-2" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        className="h-8 p-1 bg-transparent border rounded-md outline-none border-zinc-500 focus:border-white/50 "
        type="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="submit"
        value="Login"
        className="h-8 px-4 py-1 text-gray-300 transition-colors duration-300 ease-in-out border rounded-md hover:cursor-pointer hover:text-white border-zinc-500 hover:border-white/50 hover:bg-white/5"
      />
    </form>
  );
};

export default Login;
