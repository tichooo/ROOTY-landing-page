import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

export default function Intro() {
  const { t } = useTranslation();

  return (
    <section id="intro" className="py-20 bg-white">
      <div className="w-full px-8 md:px-12">
        {/* Titre 1 */}
        <FadeIn mode="onScroll" repeat delay={0.1}>
          <h2 className="text-4xl md:text-6xl lg:text-6xl font-semi-bold leading-[1.1] text-gray-900 hidden sm:block">
            {t("intro_headline")}
          </h2>
        </FadeIn>

        {/* Titre 2 */}
        <FadeIn mode="onScroll" repeat delay={0.1}>
          <h3 className="mt-8 text-3xl md:text-5xl lg:text-5xl font-medium text-gray-900">
            {t("intro_welcome")}
          </h3>
        </FadeIn>

        {/* Paragraphe 1 */}
        <FadeIn mode="onScroll" repeat delay={0.15}>
          <p className="mt-10 max-w-3xl text-base md:text-lg text-gray-700">
            {t("intro_para1")}
          </p>
        </FadeIn>

        {/* Paragraphe 2 */}
        <FadeIn mode="onScroll" repeat delay={0.18}>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-gray-700">
            {t("intro_para2")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
