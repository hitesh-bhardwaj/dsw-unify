import { Suspense } from "react";
import AgentsPage from "./AgentsContent";
export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading agents...</div>}>
      <AgentsPage />
    </Suspense>
  );
}


