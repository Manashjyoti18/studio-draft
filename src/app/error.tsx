"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // If it's a chunk loading failure from a fresh build, automatically reload the page
    if (
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("Failed to fetch")
    ) {
      window.location.reload();
      return;
    }
    // Error boundary crash logging
    console.error("Studio Draft Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[#071633] text-[#FAF5EB] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-[#0A1F44] rounded-[4px] border border-[#FAF5EB]/15 p-8 shadow-xl">
        <div className="font-mono text-xs uppercase tracking-wider text-[#FF6B4A] font-bold mb-3 flex items-center justify-center gap-2">
          <span>NOTICE</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-[#FAF5EB] mb-3">
          Session Notice
        </h2>

        <p className="text-sm text-[#FAF5EB]/75 mb-6 leading-relaxed">
          The website assets have been updated. Reload the page to load the latest studio build.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              } else {
                reset();
              }
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-[4px] bg-[#FF6B4A] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#E85635] transition-all shadow-sm"
          >
            Reload Website
          </button>
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-[4px] border border-[#FAF5EB]/30 text-[#FAF5EB] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#071633] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
