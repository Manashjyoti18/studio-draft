"use client";

import React, { useState } from "react";
import Image, { type ImageProps } from "next/image";

export interface SafeImageProps extends ImageProps {
  fallbackClassName?: string;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallbackClassName,
  onError,
  loading = "lazy",
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // If source is missing, or previously failed to load, hide image without broken icon
  if (!src || hasError) {
    return (
      <div
        className={
          fallbackClassName ||
          "w-full h-full bg-[#0A1F44] border border-[#FAF5EB]/10 flex items-center justify-center"
        }
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Studio Draft asset"}
      className={className}
      loading={loading}
      onError={(e) => {
        // Suppress browser crash, hide broken image cleanly
        setHasError(true);
        if (onError) {
          try {
            onError(e);
          } catch {
            // Keep clean
          }
        }
      }}
      {...props}
    />
  );
}
