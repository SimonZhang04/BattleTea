import React, { useState } from "react";
import { generateRandomUsername } from "../utils/generateRandomUsername.ts";

export default function Room() {
  const [username, setUsername] = useState<string>(generateRandomUsername());

  return (
    <div>
      <h1 className="text-xxl">Home Page</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a username"
      />
    </div>
  );
}
