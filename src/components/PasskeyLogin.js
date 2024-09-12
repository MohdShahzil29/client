"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function PasskeyLogin() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", { redirect: false, email });
    if (res?.error) {
      alert("Login failed");
    } else {
      alert("Logged in successfully!");
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login with Passkey</button>
      <style jsx>{`
        input {
          margin: 10px;
          padding: 8px;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
