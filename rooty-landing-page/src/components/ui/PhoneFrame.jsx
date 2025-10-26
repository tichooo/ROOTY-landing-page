// src/components/ui/PhoneFrame.jsx
import React from "react";

export default function PhoneFrame({
  width = 280,
  height = 580,
  children,
  className = "",
  onTouchStart,
  onTouchEnd,
  onMouseEnter,
  onMouseLeave,
  // nouveaux réglages optionnels
  screenInset = 4,                 // marge entre bezel et écran (px)
  screenRadius = "2.7rem",         // arrondi de l’écran
  bezelRadius = "2.9rem",          // arrondi de la zone bezel
  outerRadius = "3rem",            // arrondi du contour externe
  screenBg = "white",              // fond de l’écran (utile si PNGs transparents)
  shadow = "0 40px 45px rgba(0,0,0,0.25)", // ombre sous le téléphone
}) {
  return (
    <div
      className={`mx-auto relative ${className}`}
      style={{ width, height, filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.12))" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Phone outer frame with 3D effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 p-[3px]"
        style={{ borderRadius: outerRadius }}
      >
        {/* Inner bezel with metallic effect */}
        <div
          className="absolute inset-[1px] bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
          style={{ borderRadius: bezelRadius }}
        >
          {/* Screen content */}
          <div
            className="absolute overflow-hidden"
            style={{
              inset: screenInset,
              borderRadius: screenRadius,
              background: screenBg,
              boxShadow: shadow,
            }}
          >
            {children}
          </div>
        </div>

        {/* Notch area with camera and sensors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px]">
          <div className="absolute inset-0 bg-gray-900 rounded-b-[1.2rem]"></div>
          <div className="absolute right-8 top-2.5 w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700"></div>
          <div className="absolute left-6 top-3 w-4 h-1 rounded-full bg-gray-800"></div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-0.5 top-[100px] w-1 h-[25px] bg-gradient-to-r from-gray-600 to-gray-700 rounded-l shadow-lg"></div>
        <div className="absolute -left-0.5 top-[135px] w-1 h-[50px] bg-gradient-to-r from-gray-600 to-gray-700 rounded-l shadow-lg"></div>
        <div className="absolute -right-0.5 top-[120px] w-1 h-[35px] bg-gradient-to-l from-gray-600 to-gray-700 rounded-r shadow-lg"></div>

        {/* Subtle reflections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: outerRadius,
            background:
              "linear-gradient(45deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
      </div>
    </div>
  );
}
