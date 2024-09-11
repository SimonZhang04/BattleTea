"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, LogOut } from "lucide-react";

type Message = {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
};

type Participant = {
  id: number;
  name: string;
  avatar: string;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: "You",
        text: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50">
      <header className="p-4 bg-amber-800 text-amber-100">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            BattleTea Room: Chai Champions
          </h1>
          <Button
            variant="outline"
            className="text-amber-100"
            onClick={() => alert("Leaving room...")}
          >
            <LogOut className="mr-2 h-4 w-4" /> Leave Room
          </Button>
        </div>
      </header>

      <div className="flex-grow flex overflow-hidden">
        <main className="flex-grow flex flex-col p-4">
          <ScrollArea className="flex-grow mb-4" ref={scrollAreaRef}>
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <p className="font-semibold text-gray-700">{message.user}</p>
                <p className="bg-white p-2 rounded-lg inline-block text-gray-700">
                  {message.text}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </ScrollArea>
          <div className="flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-grow mr-2 text-gray-700"
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
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
