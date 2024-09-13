"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, LogOut } from "lucide-react";
import Link from "next/link";
import { Socket } from "socket.io-client";

interface IMsgDataTypes {
  roomId: string | number;
  user: string;
  msg: string;
  time: string;
}

interface ChatRoomProps {
  socket: Socket;
  username: string;
  roomId?: string;
}

type Participant = {
  id: number;
  name: string;
  avatar: string;
};

export default function ChatRoom({ socket, username, roomId }: ChatRoomProps) {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);
  const [participants] = useState<Participant[]>([
    { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
  ]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId: roomId || "Unknown room",
        user: username,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <header className="p-4 bg-amber-800 text-amber-100">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            BattleTea Room: {roomId}
          </h1>
          <Link href="/">
            <Button variant="outline" className="text-amber-100">
              <LogOut className="mr-2 h-4 w-4" /> Leave Room
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        <main className="flex-grow flex flex-col p-4">
          <ScrollArea className="flex-grow mb-4" ref={scrollAreaRef}>
            {chat.map((message) => (
              <div key={message.time} className="mb-4">
                <p className="font-semibold text-gray-700">{message.user}</p>
                <p className="bg-white p-2 rounded-lg inline-block text-gray-700">
                  {message.msg}
                </p>
                <p className="text-xs text-gray-500 mt-1">{message.time}</p>
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={(e) => sendData(e)}>
            <div className="flex">
              <Input
                type="text"
                placeholder="Type your message..."
                value={currentMsg}
                onChange={(e) => setCurrentMsg(e.target.value)}
                className="flex-grow mr-2 text-gray-700"
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </main>

        <aside className="w-64 bg-amber-100 p-4 overflow-y-auto">
          <h2 className="font-bold mb-4 text-gray-700">Participants</h2>
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback className="text-gray-700">
                  {participant.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700">{participant.name}</span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
