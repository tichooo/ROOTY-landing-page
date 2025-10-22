import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const items = [
    { title: t("features_1_title"), desc: t("features_1_desc") },
    { title: t("features_2_title"), desc: t("features_2_desc") },
    { title: t("features_3_title"), desc: t("features_3_desc") },
    { title: t("features_4_title"), desc: t("features_4_desc") },
    { title: t("features_5_title"), desc: t("features_5_desc") },
    { title: t("features_6_title"), desc: t("features_6_desc") },
  ];

  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn mode="onScroll" repeat duration={0.4}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            {t("features_title")}
          </h2>
        </FadeIn>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((x, i) => (
            <FadeIn
              key={x.title}
              mode="onScroll"
              repeat
              delay={0.05 * i}
              amount={0.25}
            >
              <div className="rounded-2xl border p-6 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <h3 className="font-semibold">{x.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{x.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
