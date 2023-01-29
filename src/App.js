import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3005", {
  query: {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiJjbGNyYmJxMm0wMDAwdnFtczBnOWJ4dWtjIiwiZW1haWwiOiJhbmFzX2hhc2FuQGhvdG1haWwuY29tIiwicGhvbmUiOm51bGwsIm5hbWUiOiJ0ZXN0IGlmIHVzZXIgY2FuIHVwZGF0ZSBpdHMgb25lICBpbmYiLCJwYXNzd29yZCI6bnVsbCwicHJvZmlsZUltYWdlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vNjE3Nzk2ODU5ODg5NDUwOS9waWN0dXJlP2hlaWdodD0yMDAiLCJjb3ZlckltYWdlIjpudWxsLCJicmllZiI6bnVsbCwicm9sZSI6IlVTRVIiLCJpc0Jsb2NrZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wMS0xMVQwNzowMDo0My41NzhaIiwidXBkYXRlZEF0IjoiMjAyMy0wMS0xNlQwMDowMDowMC4wMDBaIn0sInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2NzQ0MTEyMDgsImV4cCI6MTY3ODAxMTIwOH0.VrMLtQtxqqusInfM_dbZMTzPivXLxGKdwXoJbxtIKKEHIftS1M74FIcXnNacd6NAR9kv1yxCzYrSkvKDptKr7cP9rFqwRXk2L7xv2GCNHo9sy3KCyEGwfT6cqwphGh_FobRAZV94Rb4n6ZOx2vAPsISoKTTyCLwnGwshbS87-I4",
  },
});
const history = socket.on("history", (data) => {
  console.log(data);
});

//io.connect("http://localhost:3005");

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
