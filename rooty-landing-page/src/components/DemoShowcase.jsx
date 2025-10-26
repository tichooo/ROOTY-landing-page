import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";
import PhoneFrame from "../components/ui/PhoneFrame";

export default function DemoShowcase() {
  const { t } = useTranslation();

  // Your demo screens (add/remove as you like)
  const screens = ["/img/screen_routing.png", "/img/screen_guidance.png", "/img/screen_community.png", "/img/demo-2.png", "/img/demo-3.png"];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % screens.length);
    }, 2600);
    return () => clearInterval(timerRef.current);
  }, [paused, screens.length]);

  // touch swipe
  const startX = useRef(null);
  function onTouchStart(e) {
    startX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    const threshold = 40;
    if (dx < -threshold) setIndex((i) => (i + 1) % screens.length);
    if (dx > threshold) setIndex((i) => (i - 1 + screens.length) % screens.length);
    startX.current = null;
  }

  return (
    <section
      id="demo"
      className="bg-white py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 text-center">
        {/* Visual first (phone frame) */}
        <FadeIn mode="onScroll" repeat>
          <div className="w-[280px] h-[580px] mx-auto relative"
               onTouchStart={onTouchStart}
               onTouchEnd={onTouchEnd}
          >
            {/* Phone outer frame with 3D effect */}
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-gray-700 to-gray-900 transform rotate-0 p-[3px]">
              {/* Inner bezel with metallic effect */}
              <div className="absolute inset-[1px] rounded-[2.9rem] bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800">
                {/* Screen content */}
                <div className="absolute inset-[4px] rounded-[2.7rem] overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={screens[index]}
                        alt={t("demo_screen_alt", { index: index + 1 })}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>
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
        </FadeIn>

        {/* Dots */}
        <FadeIn mode="onScroll" repeat delay={0.05}>
          <div className="mt-5 flex items-center justify-center gap-2">
            {screens.map((_, i) => (
              <button
                key={i}
                aria-label={t("demo_go_to_slide", { n: i + 1 })}
                onClick={() => setIndex(i)}
                className={[
                  "h-2 w-2 rounded-full transition-all",
                  i === index ? "bg-gray-800 w-6" : "bg-gray-300 hover:bg-gray-400",
                ].join(" ")}
              />
            ))}
          </div>
        </FadeIn>

        {/* Subtitle under the visual */}
        <FadeIn mode="onScroll" repeat delay={0.1}>
          <h3 className="mt-6 text-lg md:text-xl font-medium text-gray-800">
            {t("demo_subtitle")}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{t("demo_caption")}</p>
        </FadeIn>
      </div>
    </section>
  );
}
