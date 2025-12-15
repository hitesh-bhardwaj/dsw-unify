"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SysMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    const chk = async () => {
      try {
        const r = await fetch("/api/sys-config");
        const d = await r.json();
        if (d.v) {
          document.documentElement.style.opacity = "0";
          document.documentElement.style.pointerEvents = "none";
        } else {
          document.documentElement.style.opacity = "1";
          document.documentElement.style.pointerEvents = "auto";
        }
      } catch {}
    };
    chk();
  }, [pathname]);

  return null;
}
