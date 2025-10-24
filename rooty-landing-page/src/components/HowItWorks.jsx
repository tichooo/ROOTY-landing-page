import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

function Block({ title, intro, bullets, img, alt, reverse = false }) {
  return (
    <section className="py-14">
      <div
        className={[
          "w-full px-6 lg:px-10",
          "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
          reverse ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        {/* Texte */}
        <FadeIn mode="onScroll" repeat amount={0.2}>
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-4 text-gray-700">{intro}</p>

            <ul className="mt-6 space-y-3 text-gray-800">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span className="mt-[2px]">{b.emoji}</span>
                  <span>
                    <span className="font-semibold">{b.strong}</span>
                    {b.text && <> {b.text}</>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Visuel */}
        <FadeIn mode="onScroll" repeat delay={0.05}>
          <div className="grid place-items-center">
            <img
              src={img}
              alt={alt}
              className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] select-none rounded-[36px] shadow-[0_40px_45px_rgba(0,0,0,0.25)]"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <div id="how" className="bg-white">
      {/* Bloc 1 */}
      <Block
        title={t("hiw_1_title")}
        intro={t("hiw_1_intro")}
        bullets={[
          { emoji: "🛡️", strong: t("hiw_1_b1_strong"), text: t("hiw_1_b1_text") },
          { emoji: "🚲", strong: t("hiw_1_b2_strong"), text: t("hiw_1_b2_text") },
          { emoji: "🌙", strong: t("hiw_1_b3_strong"), text: t("hiw_1_b3_text") },
        ]}
        img="/img/screen-routing.png"
        alt={t("hiw_1_alt")}
      />

      {/* Bloc 2 */}
      <Block
        title={t("hiw_2_title")}
        intro={t("hiw_2_intro")}
        bullets={[
          { emoji: "🔊", strong: t("hiw_2_b1_strong"), text: t("hiw_2_b1_text") },
          { emoji: "🧭", strong: t("hiw_2_b2_strong"), text: t("hiw_2_b2_text") },
          { emoji: "🧿", strong: t("hiw_2_b3_strong"), text: t("hiw_2_b3_text") },
        ]}
        img="/img/screen-guidance.png"
        alt={t("hiw_2_alt")}
        reverse
      />

      {/* Bloc 3 */}
      <Block
        title={t("hiw_3_title")}
        intro={t("hiw_3_intro")}
        bullets={[
          { emoji: "👤", strong: t("hiw_3_b1_strong"), text: t("hiw_3_b1_text") },
          { emoji: "🤝", strong: t("hiw_3_b2_strong"), text: t("hiw_3_b2_text") },
          { emoji: "💬", strong: t("hiw_3_b3_strong"), text: t("hiw_3_b3_text") },
        ]}
        img="/img/screen-community.png"
        alt={t("hiw_3_alt")}
      />

      {/* Bloc 4 (stats / progression) — optionnel, décommente si tu veux 4 écrans)
      <Block
        title={t("hiw_4_title")}
        intro={t("hiw_4_intro")}
        bullets={[
          { emoji: "📊", strong: t("hiw_4_b1_strong"), text: t("hiw_4_b1_text") },
          { emoji: "🔥", strong: t("hiw_4_b2_strong"), text: t("hiw_4_b2_text") },
          { emoji: "📈", strong: t("hiw_4_b3_strong"), text: t("hiw_4_b3_text") },
        ]}
        img="/img/screen-stats.png"
        alt={t("hiw_4_alt")}
        reverse
      />
      */}
    </div>
  );
}
