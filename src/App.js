import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3005", {
  query: {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiJjbGR3NmhxbzQwMDAwdnE0YTJqc3V3aGh3IiwiZW1haWwiOiJzYW1pQG5hZHNvZnQubmV0IiwicGhvbmUiOm51bGwsIm5hbWUiOiJzYW1pIiwicGFzc3dvcmQiOm51bGwsInByb2ZpbGVJbWFnZSI6bnVsbCwiY292ZXJJbWFnZSI6bnVsbCwiYnJpZWYiOm51bGwsInJvbGUiOiJVU0VSIiwiaXNCbG9ja2VkIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjMtMDItMDhUMjE6MjM6NTkuNDI3WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMDhUMjE6Mjg6MTguMTk1WiJ9LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjc2OTczMzQxLCJleHAiOjE2ODA1NzMzNDF9.U_nSMbtDAQs0PCzdMVXVerNSBU0YtAjdcmMI-M8Bas-cbSHgx5TYhp3T0aMWXevvZ8vRNX6ZphWp9MsRwAGER8-7aFTFpKenHCLYS-iw-8JumZ0xLnu77_vvAZw8w8DuR0RgDkHGWsKTpfVKQvq5AcOvPWXApH2_nzH7o60ZnIU"
  },
  path: "/socket/",
});
const history = socket.on("history", (data) => {
  console.log("HI", data);
});

//  const socket =io.connect("http://localhost:3005");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
