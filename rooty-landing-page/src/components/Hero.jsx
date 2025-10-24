import FadeIn from "./motion/FadeIn";
//import Button from "./ui/Button"; // keep if you plan to re-enable buttons later
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  const platforms = [
    { src: "/img/Windows-Logo.png", alt: "Windows" },
    { src: "/img/Linux-Logo.png", alt: "Linux" },
    { src: "/img/App_Store-Logo.png", alt: "App Store" },
    { src: "/img/Google_Play-Logo.png", alt: "Google Play" },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* ↑ More breathing room + wider container to keep title on one line */}
      <div className="mx-auto max-w-10xl px-3 pt-40 pb-20 text-center">
        {/* Title — re-triggers on scroll, single line on lg+ */}
        <FadeIn mode="onScroll" repeat delay={0.05}>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-snug text-gray-900 break-words max-w-3xl mx-auto">
            {t("hero_title")}
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn mode="onScroll" repeat delay={0.1}>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("hero_subtitle")}
          </p>
        </FadeIn>

        {/* (Buttons kept commented for now) */}
        {/*
        <FadeIn mode="onScroll" repeat delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="#cta" variant="accent" size="md">
              {t("hero_cta")}
            </Button>
            <Button href="#features" variant="secondary" size="md">
              {t("hero_features")}
            </Button>
          </div>
        </FadeIn>
        */}

        {/* Phone render */}
        <FadeIn mode="onScroll" repeat delay={0.25}>
          <div className="mt-14 mx-auto w-full grid place-items-center">
            <img
              src="/img/hero-phone.png"
              alt={t("hero_phone_alt")}
              className="w-[320px] sm:w-[380px] md:w-[320px] lg:w-[330px] select-none drop-shadow-[0_40px_45px_rgba(0,0,0,0.25)]"
            />
          </div>
        </FadeIn>

        {/* Platform icons — all go to /download */}
        <FadeIn mode="onScroll" repeat delay={0.3}>
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap opacity-80">
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
                  className="h-4 w-auto grayscale hover:grayscale-0"
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
