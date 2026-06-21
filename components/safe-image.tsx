"use client";

import { useState, useEffect } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt = "",
  className = "",
  fallbackSrc = "/images/students with smart board.jpg",
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(
    typeof src === "string" ? src : fallbackSrc
  );

  useEffect(() => {
    setImgSrc(typeof src === "string" ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      {...props}
    />
  );
}
