import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    [t("how_step1_title"), t("how_step1_desc")],
    [t("how_step2_title"), t("how_step2_desc")],
    [t("how_step3_title"), t("how_step3_desc")],
  ];

  return (
    <section id="how" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Titre */}
        <FadeIn mode="onScroll" duration={0.5}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            {t("how_title")}
          </h2>
        </FadeIn>

        {/* Étapes */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {steps.map(([title, desc], i) => (
            <FadeIn key={title} mode="onScroll" repeat delay={i * 0.1}>
              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="mx-auto mb-3 h-10 w-10 grid place-items-center rounded-full font-semibold"
                  style={{
                    backgroundColor: "rgba(72,204,189,0.12)",
                    color: "var(--color-primary)",
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
