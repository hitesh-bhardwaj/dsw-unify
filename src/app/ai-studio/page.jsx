"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {s
  const router = useRouter();

  useEffect(() => {
    router.push("/ai-studio/quick-start");
  }, [router]);

  return null; // or a loader/spinner while redirecting
};

export default Page;