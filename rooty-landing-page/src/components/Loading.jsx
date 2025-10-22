import React from 'react';
import { useTranslation } from "react-i18next";

// Simple reusable loading indicator.
// Props:
// - size (number) : pixel size of the spinner (default 20)
// - src (string)  : optional URL to a custom graphic (if provided it will render an <img>)
// - alt (string)  : alt text for custom image
export default function Loading({ size = 20, src, alt = 'loading' }) {
  if (src) {
    return (
      <img src={src} alt={alt} style={{ width: size, height: size, display: 'inline-block' }} />
    );
  }

  // Inline SVG spinner (easy to style or replace)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
      style={{ display: 'inline-block' }}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M22 12a10 10 0 0 1-10 10" />
    </svg>
  );
}
