import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  // === CONFIGURATIONS PERSONNALISABLES ===
  const FRAME_EXTRA_W = 490; // Largeur du cadre au-dessus de l’image
  const FRAME_EXTRA_H = 270; // Hauteur du cadre au-dessus de l’image
  const FRAME_SHIFT_X = 0; // Décalage horizontal (%) du cadre par rapport au centre
  const FRAME_SHIFT_Y = -2; // Décalage vertical (%) du cadre par rapport au centre
  const SCREEN_W = 300; // Largeur de l’image à l’intérieur du cadre
  const SCREEN_H = "auto"; // Hauteur automatique (ou fixe, ex: 580)

  const platforms = [
    { src: "/img/Windows-Logo.png", alt: "Windows" },
    { src: "/img/Linux-Logo.png", alt: "Linux" },
    { src: "/img/App_Store-Logo.png", alt: "App Store" },
    { src: "/img/Google_Play-Logo.png", alt: "Google Play" },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-10xl px-3 pt-40 pb-20 text-center">
        {/* Titre */}
        <FadeIn mode="onScroll" repeat delay={0.05}>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-snug text-gray-900 break-words max-w-3xl mx-auto">
            {t("hero_title")}
          </h1>
        </FadeIn>

        {/* Sous-titre */}
        <FadeIn mode="onScroll" repeat delay={0.1}>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("hero_subtitle")}
          </p>
        </FadeIn>

        {/* Image téléphone + cadre */}
        <FadeIn mode="onScroll" repeat delay={0.25}>
          <div
            className="relative mt-16 mx-auto w-fit grid place-items-center"
            style={{
              width: SCREEN_W + FRAME_EXTRA_W,
              height: typeof SCREEN_H === "number" ? SCREEN_H + FRAME_EXTRA_H : "auto",
            }}
          >
            {/* Cadre du téléphone */}
            <img
              src="/img/phone-frame.png"
              alt="Phone frame"
              className="absolute z-20 pointer-events-none select-none"
              style={{
                width: SCREEN_W + FRAME_EXTRA_W,
                height:
                  typeof SCREEN_H === "number" ? SCREEN_H + FRAME_EXTRA_H : "auto",
                transform: `translate(${FRAME_SHIFT_X}%, ${FRAME_SHIFT_Y}%)`,
              }}
            />

            {/* Écran interne */}
            <img
              src="/img/screen_routing.png"
              alt={t("hero_phone_alt")}
              className="relative z-10 select-none drop-shadow-[0_40px_45px_rgba(0,0,0,0.25)] rounded-[1.8rem]"
              style={{
                width: SCREEN_W,
                height: SCREEN_H,
              }}
            />
          </div>
        </FadeIn>

        {/* Logos plateformes */}
        <FadeIn mode="onScroll" repeat delay={0.3}>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap opacity-80">
            {platforms.map(({ src, alt }) => (
              <a
                key={alt}
                href="/download"
                className="inline-flex p-2 rounded-lg transition hover:opacity-100 hover:-translate-y-0.5"
                aria-label={`${alt} ${t("hero_download_label")}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-5 w-auto grayscale hover:grayscale-0"
                />
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {t("hero_platforms_caption")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
