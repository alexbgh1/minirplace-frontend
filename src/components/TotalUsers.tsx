import { useContext } from "react";
import SocketContext from "../context/socket-context";

const TotalUsers = () => {
  const { SocketState } = useContext(SocketContext);
  return (
    <div className="px-2 py-1 rounded-b-sm bg-smooth-black">
      <small>Online {SocketState.usersConnected}</small>
    </div>
  );
};

export default TotalUsers;
