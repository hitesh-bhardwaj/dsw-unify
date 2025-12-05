"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Page component for the AI Studio root.
 * Redirects to the quick-start page.
 *
 * @returns {null} Returns null as it performs a redirect.
 */
const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/ai-studio/quick-start");
  }, [router]);

  return null; // or a loader/spinner while redirecting
};

export default Page;
