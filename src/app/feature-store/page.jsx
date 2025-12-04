"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Page component for the Feature Store root.
 * Redirects to the feature-transformations page.
 *
 * @returns {null} Returns null as it performs a redirect.
 */
const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/feature-store/feature-transformations");
  }, [router]);

  return null; // or a loader/spinner while redirecting
};

export default Page;
