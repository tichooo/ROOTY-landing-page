import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

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
        {/* Visual first (smaller phone frame) */}
        <FadeIn mode="onScroll" repeat>
          <div className="mx-auto relative w-[210px] sm:w-[240px] md:w-[270px] lg:w-[290px]">
            {/* Viewport */}
            <div
              className="relative overflow-hidden rounded-[32px] shadow-[0_30px_40px_rgba(0,0,0,0.22)] ring-1 ring-black/10 bg-black/2 aspect-[9/19.5] touch-pan-y"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={index}
                  src={screens[index]}
                  alt={t("demo_screen_alt", { index: index + 1 })}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {/* Optional realistic bezel over the viewport */}
            { <img
              src="/img/phone-frame.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full"
            />}
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
