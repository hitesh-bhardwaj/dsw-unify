"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/agent-studio/agents");
  }, [router]);

  return null; // or a loader/spinner while redirecting
};

export default Page;