import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FadeIn from "./motion/FadeIn";
import PhoneFrame from "../components/ui/PhoneFrame"; // ✅ ton composant réutilisable
import { motion, AnimatePresence } from "framer-motion";

export default function DemoRail() {
  const { t } = useTranslation();

  // === CONFIG ===
  const SLIDE_W = 260; // largeur d’un écran
  const SLIDE_H = 520; // hauteur d’un écran
  const GAP = 70; // espace entre écrans
  const VISIBLE = 5;
  const AUTOPLAY_MS = 2600;

  // 👉 dézoom appliqué UNIQUEMENT à l’image dans le PhoneFrame (pas aux écrans du rail)
  const SCREEN_SCALE = 0.96; // 1.00 = normal, 0.9 = léger dézoom, 0.8 = fort dézoom

  const slides = useMemo(
    () => [
      "/img/screen_routing.png",
      "/img/screen_guidance.png",
      "/img/screen_community.png",
      "/img/demo-2.png",
      "/img/demo-3.png",
    ],
    []
  );

  const extended = useMemo(
    () => slides.concat(slides, slides, slides, slides),
    [slides]
  );
  const N = slides.length;
  const BASE = N;

  const [index, setIndex] = useState(BASE);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(false);

  // autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => i + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, AUTOPLAY_MS]);

  // boucle fluide (continuelle)
  useEffect(() => {
    if (index >= BASE + N) {
      const to = setTimeout(() => {
        setInstant(true);
        setIndex((i) => i - N);
      }, 720);
      return () => clearTimeout(to);
    }
    if (index < BASE - 1) {
      const to = setTimeout(() => {
        setInstant(true);
        setIndex((i) => i + N);
      }, 720);
      return () => clearTimeout(to);
    }
  }, [index, BASE, N]);

  useEffect(() => {
    if (!instant) return;
    const to = setTimeout(() => setInstant(false), 20);
    return () => clearTimeout(to);
  }, [instant]);

  // position du rail
  const c = Math.floor(VISIBLE / 2);
  const step = SLIDE_W + GAP;
  const translateX = (c - index) * step;

  return (
    <section id="demo" className="relative py-24 overflow-hidden bg-transparent">
      <FadeIn mode="onScroll" repeat>
        <div
          className="relative w-full bg-transparent overflow-visible"
          style={{ height: SLIDE_H + 250 }}
        >
          {/* === Rail d’écrans (inchangé) === */}
          <div
            className="absolute left-1/2 top-1/2 flex items-center justify-center"
            style={{
              gap: `${GAP}px`,
              transform: `translate(-50%, -50%) translateX(${translateX}px)`,
              transition: instant ? "none" : "transform 700ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {extended.map((src, i) => (
              <img
                key={`${src}-${i}`}
                src={src}
                alt={t("demo_screen_alt", { index: ((i % N) + 1) })}
                draggable={false}
                onClick={() => setPaused((p) => !p)} // pause au clic
                style={{
                  width: SLIDE_W,
                  height: SLIDE_H,
                  objectFit: "cover",
                  borderRadius: 30,
                  boxShadow: "0 60px 80px rgba(0,0,0,.15)",
                  userSelect: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* === PhoneFrame centré (au-dessus du rail) === */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <PhoneFrame width={SLIDE_W + 50} height={SLIDE_H + 60}>
              <AnimatePresence>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 grid place-items-center"
                >
                  {/* 👉 dézoom appliqué ici uniquement */}
                  <img
                    src={slides[index % N]}
                    alt="Phone screen"
                    className="w-full h-full object-contain"
                    style={{
                      transform: `scale(${SCREEN_SCALE})`,
                      transformOrigin: "center center",
                    }}
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </div>
        </div>
      </FadeIn>

      {/* Dots */}
      <FadeIn mode="onScroll" repeat delay={0.05}>
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => {
            const isActive = (index % N + N) % N === i;
            return (
              <button
                key={i}
                onClick={() => setIndex(BASE + i)}
                aria-label={t("demo_go_to_slide", { n: i + 1 })}
                className={[
                  "h-2 rounded-full transition-all",
                  isActive ? "bg-gray-800 w-6" : "bg-gray-300 w-2 hover:bg-gray-400",
                ].join(" ")}
              />
            );
          })}
        </div>
      </FadeIn>

      {/* Sous-titre */}
      <FadeIn mode="onScroll" repeat delay={0.1}>
        <h3 className="mt-6 text-center text-lg md:text-xl font-medium text-gray-800">
          {t("demo_subtitle")}
        </h3>
        <p className="mt-2 text-center text-sm text-gray-500">
          {t("demo_caption")}
        </p>
      </FadeIn>
    </section>
  );
}
