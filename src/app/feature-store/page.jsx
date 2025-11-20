"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/feature-store/feature-transformations");
  }, [router]);

  return null; // or a loader/spinner while redirecting
};

export default Page;