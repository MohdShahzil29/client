"use client";

import { useState } from "react";
import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";

const WebAuthnDemo = () => {
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/auth/webauthn", {
      method: "POST",
      body: JSON.stringify({ action: "register", username }),
      headers: { "Content-Type": "application/json" },
    });
    const options = await res.json();
    const credential = await startRegistration(options);
    console.log("Registration successful", credential);
  };

  const handleLogin = async () => {
    const res = await fetch("/api/auth/webauthn", {
      method: "POST",
      body: JSON.stringify({ action: "login", username }),
      headers: { "Content-Type": "application/json" },
    });
    const options = await res.json();
    const credential = await startAuthentication(options);
    console.log("Login successful", credential);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleRegister}>Register with Passkey</button>
      <button onClick={handleLogin}>Login with Passkey</button>
    </div>
  );
};

export default WebAuthnDemo;
