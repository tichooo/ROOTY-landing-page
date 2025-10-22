import FadeIn from "./motion/FadeIn";
import Button from "./ui/Button";
import { useTranslation } from "react-i18next";

export default function Pricing() {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn mode="onScroll" duration={0.5}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            {t("pricing_title")}
          </h2>
        </FadeIn>

        <FadeIn mode="onScroll" delay={0.1}>
          <p className="mt-3 text-gray-600 text-center">
            {t("pricing_subtitle")}
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lovable */}
          <FadeIn mode="onScroll" repeat>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-semibold">{t("pricing_lovable_name")}</h3>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  {t("pricing_free_badge")}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {t("pricing_lovable_desc")}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">{t("pricing_free_label")}</span>
                <span className="text-gray-500"> {t("pricing_free_forever")}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                <li>• {t("pricing_feat_lane")}</li>
                <li>• {t("pricing_feat_safer")}</li>
                <li>• {t("pricing_feat_parking")}</li>
                <li>• {t("pricing_feat_privacy")}</li>
              </ul>
              <Button href="#cta" className="mt-6 block w-full" size="md" variant="accent">
                {t("pricing_cta_start_free")}
              </Button>
            </div>
          </FadeIn>

          {/* Pro (coming soon) */}
          <FadeIn mode="onScroll" repeat delay={0.05}>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg opacity-90">
              <h3 className="text-xl font-semibold">
                {t("pricing_pro_name")} <span className="text-xs text-gray-500">({t("pricing_coming_soon")})</span>
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t("pricing_pro_desc")}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">€3</span>
                <span className="text-gray-500"> {t("pricing_per_month")}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                <li>• {t("pricing_includes_lovable")}</li>
                <li>• {t("pricing_feat_weather")}</li>
                <li>• {t("pricing_feat_elevation")}</li>
                <li>• {t("pricing_feat_favorites")}</li>
              </ul>
              <Button className="mt-6 w-full" size="md" variant="secondary" disabled>
                {t("pricing_cta_join_waitlist")}
              </Button>
            </div>
          </FadeIn>

          {/* City / Teams (coming soon) */}
          <FadeIn mode="onScroll" repeat delay={0.1}>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg opacity-90">
              <h3 className="text-xl font-semibold">
                {t("pricing_teams_name")} <span className="text-xs text-gray-500">({t("pricing_coming_soon")})</span>
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t("pricing_teams_desc")}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">{t("pricing_custom_label")}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                <li>• {t("pricing_feat_dashboards")}</li>
                <li>• {t("pricing_feat_api")}</li>
                <li>• {t("pricing_feat_priority")}</li>
              </ul>
              <Button href="#cta" className="mt-6 block w-full" size="md" variant="secondary">
                {t("pricing_cta_contact")}
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
