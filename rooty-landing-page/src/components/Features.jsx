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
        <h2 className="text-3xl sm:text-4xl font-bold text-center">Why riders choose Rooty</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((x) => (
            <div key={x.title} className="rounded-2xl border p-6 bg-white shadow-sm">
              <h3 className="font-semibold">{x.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

