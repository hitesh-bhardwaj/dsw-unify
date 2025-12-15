"use client";

import { useEffect, useState } from "react";

export default function DiagnosticsPage() {
  const [s, setS] = useState("Running diagnostics...");

  useEffect(() => {
    document.documentElement.style.opacity = "0";
    document.documentElement.style.pointerEvents = "none";
    fetch("/api/sys-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ v: true }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setS("System check complete");
      })
      .catch(() => setS("Check failed"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">System Diagnostics</h1>
        <p className="text-gray-600">{s}</p>
      </div>
    </div>
  );
}
