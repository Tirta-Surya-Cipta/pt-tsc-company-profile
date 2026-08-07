"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Global System Fault:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#080a0f] text-white font-sans min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md p-8 border border-red-500/20 bg-red-500/5 rounded-lg shadow-xl">
          <div className="mx-auto flex items-center justify-center p-3 rounded-full bg-red-500/10 text-red-500 w-fit">
            <AlertTriangle className="h-10 w-10 animate-bounce" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Root Telemetry Fault</h2>
          <p className="text-sm text-red-400 font-mono bg-black/40 p-4 rounded border border-red-500/10 text-left overflow-auto max-h-40">
            An unrecoverable system layer error occurred.
          </p>
          <button
            onClick={reset}
            className="w-full h-10 px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded transition-colors cursor-pointer"
          >
            Re-boot Base Operations
          </button>
        </div>
      </body>
    </html>
  );
}
