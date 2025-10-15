export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">How it works</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            ["Pick destination", "Tell Rooty where you’re going."],
            ["Choose vibe", "Safest, flattest, or fastest route for your ride."],
            ["Ride with confidence", "Turn-by-turn guidance built for micromobility."],
          ].map(([t, d], i) => (
            <div key={t} className="rounded-2xl border bg-white p-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 grid place-items-center rounded-full font-semibold" style={{backgroundColor: 'rgba(72,204,189,0.12)', color: 'var(--color-primary)'}}>{i+1}</div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-2 text-gray-600 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
