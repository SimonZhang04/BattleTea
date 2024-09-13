import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomUsername() {
  const adjectives = [
    "Quick",
    "Lazy",
    "Sleepy",
    "Happy",
    "Crazy",
    "Brave",
    "Clever",
    "Mighty",
    "Charming",
    "Funny",
    "Cool",
    "Witty",
    "Bright",
    "Wise",
    "Swift",
  ];

  const nouns = [
    "Tiger",
    "Elephant",
    "Penguin",
    "Fox",
    "Eagle",
    "Lion",
    "Panda",
    "Shark",
    "Wolf",
    "Bear",
    "Falcon",
    "Dragon",
    "Cheetah",
    "Leopard",
    "Whale",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999

  return `${randomAdjective}${randomNoun}${randomNumber}`;
}

export function generateRoomCode(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let joinCode = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    joinCode += characters[randomIndex];
  }

  return joinCode;
}
