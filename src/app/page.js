"use client";
import Swipe from "../components/Swipe";
import BarChart from "../components/BarChart";
import PasskeyLogin from "../components/PasskeyLogin";

import Switch from "react-ios-switch";

import Advanced from "@/components/carousel/Advanced";
import Simple from "@/components/carousel/Simple";
import { useState } from "react";

export default function Home() {
  const [showAdvanced, setShowAdvanced] = useState(true);
  return (
    <div>
      <h1>Swipe Animation</h1>
      <div className="app">
        {showAdvanced ? <Advanced /> : <Simple />}
        <div className="row">
          <p style={{ color: "#fff" }}>Show advanced example</p>{" "}
          <Switch checked={showAdvanced} onChange={setShowAdvanced} />
        </div>
      </div>
      <h1>Bar Chart</h1>
      <BarChart />
      <h1>Passkey Login</h1>
      <PasskeyLogin />
    </div>
  );
}
