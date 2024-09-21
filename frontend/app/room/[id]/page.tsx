"use client";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatRoom from "./ChatRoom";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { generateRandomUsername } from "@/lib/utils";

export default function Page() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState(generateRandomUsername());
  const pathname = usePathname();
  const roomId = pathname.split("/").pop();
  const socket = io("http://localhost:3001");

  const handleJoin = () => {
    if (username && roomId) {
      socket.emit("join_room", roomId, username);
      setShowChat(true);
    } else {
      if (!username) {
        alert("Please fill in Username");
      } else if (!roomId) {
        alert("Please provide a Room ID");
      }
    }
  };

  return (
    <div>
      <div
        className="flex flex-col min-h-screen bg-gradient-to-b from-amber-100 to-amber-200"
        style={{ display: showChat ? "none" : "" }}
      >
        <header className="p-4 bg-amber-800 text-amber-100">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center">BattleTea</h1>
            <nav>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">How to Play</Button>
                </DialogTrigger>
                <DialogContent className="bg-black">
                  <DialogHeader>
                    <DialogTitle>How to Play BattleTea</DialogTitle>
                    <DialogDescription>
                      BattleTea is a fun and exciting multiplayer game where
                      players compete to brew the best tea!
                      <ol className="list-decimal list-inside mt-4 space-y-2">
                        <li>Enter your username and create or join a room.</li>
                        <li>Once in a room, wait for other players to join.</li>
                        <li>
                          Each round, select your tea ingredients and brewing
                          method.
                        </li>
                        <li>
                          Score points based on the quality and uniqueness of
                          your tea.
                        </li>
                        <li>
                          The player with the most points after 5 rounds wins!
                        </li>
                      </ol>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-amber-800">
              Welcome to BattleTea
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <Input
                  className="text-black"
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <Button
                className="w-full text-gray-500"
                variant="outline"
                disabled={!username}
                onClick={() => handleJoin()}
              >
                Join Room
              </Button>
            </div>
          </div>
        </main>
        <footer className="bg-amber-800 text-amber-100 py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 BattleTea. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <div style={{ display: !showChat ? "none" : "" }}>
        <ChatRoom socket={socket} roomId={roomId} username={username} />
      </div>
    </div>
  );
}
