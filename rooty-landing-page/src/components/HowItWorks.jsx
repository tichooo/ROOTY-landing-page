import FadeIn from "./motion/FadeIn";

export default function HowItWorks() {
  const steps = [
    ["Pick destination", "Tell Rooty where you’re going."],
    ["Choose vibe", "Safest, flattest, or fastest route for your ride."],
    ["Ride with confidence", "Turn-by-turn guidance built for micromobility."],
  ];

  return (
    <section id="how" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        {/* Titre */}
        <FadeIn mode="onScroll" duration={0.3}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">How it works</h2>
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
