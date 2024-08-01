import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Toaster } from "sonner";

import SocketContextProvider from "./providers/SocketProvider.tsx";
import AuthContextProvider from "./providers/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketContextProvider>
    <AuthContextProvider>
      <App />
      <Toaster closeButton />
    </AuthContextProvider>
  </SocketContextProvider>
);
