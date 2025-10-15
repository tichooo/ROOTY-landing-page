export default function Hero() {
  return (
    <section className="bg-gradient-to-b to-white" style={{backgroundImage: 'linear-gradient(to bottom, rgba(72,204,189,0.08), white)'}}>
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Safer, smoother routes for bikes & scooters
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Rooty finds micromobility-friendly paths, avoids dangerous roads, and shows bike lanes, parking and charging spots.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#cta" className="rounded-xl px-6 py-3 text-white font-medium hover:opacity-90 transition" style={{backgroundColor: 'var(--color-primary)'}}>
            Get early access
          </a>
          <a href="#features" className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-50">
            See features
          </a>
        </div>
        <div className="mt-12 mx-auto max-w-4xl rounded-2xl border bg-white p-4 shadow-sm">
          <div className="aspect-[16/9] w-full rounded-xl bg-gray-100 grid place-items-center">
            <span className="text-gray-500">App preview (add screenshot/video later)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
