import { motion, AnimatePresence } from "framer-motion";

export default function PhoneFrame({
  width = 280,
  height = 580,
  children,
  className = "",
  onTouchStart,
  onTouchEnd,
  onMouseEnter,
  onMouseLeave
}) {
  return (
    <div 
      className={`mx-auto relative ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Phone outer frame with 3D effect */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-gray-700 to-gray-900 transform rotate-0 p-[3px]">
        {/* Inner bezel with metallic effect */}
        <div className="absolute inset-[1px] rounded-[2.9rem] bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800">
          {/* Screen content */}
          <div className="absolute inset-[4px] rounded-[2.7rem] overflow-hidden bg-white">
            {children}
          </div>
        </div>

        {/* Notch area with camera and sensors */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px]">
          <div className="absolute inset-0 bg-gray-900 rounded-b-[1.2rem]"></div>
          {/* Camera dot */}
          <div className="absolute right-8 top-2.5 w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700"></div>
          {/* Sensor */}
          <div className="absolute left-6 top-3 w-4 h-1 rounded-full bg-gray-800"></div>
        </div>

        {/* Side buttons with metallic effect */}
        <div className="absolute -left-0.5 top-[100px] w-1 h-[25px] bg-gradient-to-r from-gray-600 to-gray-700 rounded-l shadow-lg"></div>
        <div className="absolute -left-0.5 top-[135px] w-1 h-[50px] bg-gradient-to-r from-gray-600 to-gray-700 rounded-l shadow-lg"></div>
        <div className="absolute -right-0.5 top-[120px] w-1 h-[35px] bg-gradient-to-l from-gray-600 to-gray-700 rounded-r shadow-lg"></div>

        {/* Subtle reflections */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}