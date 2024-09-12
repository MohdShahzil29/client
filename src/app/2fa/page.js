"use client";
import { useState } from "react";

const TwoFactorAuth = () => {
  const [username, setUsername] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const generate2FA = async () => {
    const res = await fetch("/api/auth/2fa", {
      method: "POST",
      body: JSON.stringify({ action: "generate", username }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setQrCode(data.qrCode);
  };

  const verify2FA = async () => {
    const res = await fetch("/api/auth/2fa", {
      method: "POST",
      body: JSON.stringify({ action: "verify", token, username }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.message === "2FA verification successful") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={generate2FA}>Generate 2FA</button>
      {qrCode && <img src={qrCode} alt="Scan with your Authenticator app" />}
      <input
        type="text"
        placeholder="Enter Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={verify2FA}>Verify Token</button>
      {verified && <p>2FA Verification Successful</p>}
    </div>
  );
};

export default TwoFactorAuth;
