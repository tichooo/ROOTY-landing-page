import FadeIn from "./motion/FadeIn";
import { useTranslation } from "react-i18next";

const items = [
  { title: "Bike-lane routing", desc: "Prefer protected lanes and shared paths; avoid scary roads." },
  { title: "Safety signals", desc: "Heuristics from traffic, elevation, road types, and crowdsourced flags." },
  { title: "Parking & charging", desc: "Find legal scooter parking and e-bike charging spots nearby." },
  { title: "Weather & wind aware", desc: "Adjust routes when headwinds or rain make a difference." },
  { title: "Provider-friendly", desc: "Works alongside Lime, Tier, Bird, Dott, and your own bike." },
  { title: "Privacy-first", desc: "No ads. Minimal data. Opt-in sharing only." },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn mode="onScroll" repeat duration={0.5}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">Why riders choose Rooty</h2>
        </FadeIn>

        <div className="grid ...">
          {items.map((x, i) => (
            <FadeIn key={x.title} mode="onScroll" repeat delay={0.05 * i} amount={0.25}>
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
