import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/**
 * FadeIn wrapper
 * @param {string} mode - "onScroll" (trigger once when visible) or "always"
 * @param {boolean} repeat - if true, replays animation on every scroll into view
 * @param {number} delay - delay before the fade starts
 * @param {number} duration - animation duration (default 0.6s)
 */
export default function FadeIn({
  children,
  mode = "onScroll",
  repeat = false,
  delay = 0,
  duration = 0.6,
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: !repeat, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
    else if (repeat) controls.start("hidden");
  }, [controls, inView, repeat]);

  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}
