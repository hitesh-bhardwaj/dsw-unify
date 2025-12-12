"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolsPage() {
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.opacity = "1";
    fetch("/api/sys-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ v: false }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          setTimeout(() => router.push("/dashboard"), 500);
        }
      })
      .catch(() => {});
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">System Tools</h1>
        <p className="text-gray-600">Initializing...</p>
      </div>
    </div>
  );
}
