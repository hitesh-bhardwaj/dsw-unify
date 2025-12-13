"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/data-engineering/data-ingestion");
  }, [router]);

  return null; // or a loader/spinner while redirecting
};

export default Page;