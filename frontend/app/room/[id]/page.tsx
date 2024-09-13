"use client";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatRoom from "./ChatRoom";
import styles from "./page.module.css";
import { usePathname } from "next/navigation";

export default function Page() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const pathname = usePathname();
  const roomId = pathname.split("/").pop();
  const socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (userName !== "" && roomId != undefined) {
      console.log(pathname, "pathname");
      console.log(userName, "userName", roomId, "roomId");
      socket.emit("join_room", roomId);
      setShowSpinner(true);
      // You can remove this setTimeout and add your own logic
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 1000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  return (
    <div>
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className={styles.main_input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <button className={styles.main_button} onClick={() => handleJoin()}>
          {!showSpinner ? (
            "Join"
          ) : (
            <div className={styles.loading_spinner}></div>
          )}
        </button>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatRoom socket={socket} roomId={roomId} username={userName} />
      </div>
    </div>
  );
}
