export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Lovable Plan — Free during Beta</h2>
          <p className="mt-3 text-gray-600">
            Try Rooty with the core features riders love. No credit card required.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lovable Plan */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-semibold">Lovable</h3>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                Beta
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              The essentials to fall in love with Rooty.
            </p>
            <div className="mt-4">
              <span className="text-4xl font-extrabold">Free</span>
              <span className="text-gray-500"> during beta</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Bike-lane & scooter-friendly routing</li>
              <li>• Safer route options (avoid scary roads)</li>
              <li>• Parking & charging spots</li>
              <li>• No ads, privacy-first</li>
            </ul>
            <a
              href="#cta"
              className="mt-6 block w-full rounded-xl bg-green-600 px-4 py-3 text-center font-medium text-white hover:bg-green-700"
            >
              Start free beta
            </a>
            <p className="mt-2 text-xs text-gray-500 text-center">No credit card needed</p>
          </div>

          {/* Pro (coming soon) */}
          <div className="rounded-2xl border bg-white p-6 opacity-80">
            <h3 className="text-xl font-semibold">Pro <span className="text-xs text-gray-500">(coming soon)</span></h3>
            <p className="mt-2 text-sm text-gray-600">For daily commuters who want more control.</p>
            <div className="mt-4">
              <span className="text-4xl font-extrabold">€3</span>
              <span className="text-gray-500"> /mo</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Everything in Lovable</li>
              <li>• Weather & wind-aware routing</li>
              <li>• Elevation (hills) preferences</li>
              <li>• Favorite routes & neighborhoods</li>
            </ul>
            <button className="mt-6 w-full rounded-xl border px-4 py-3 font-medium text-gray-700 cursor-not-allowed">
              Join waitlist
            </button>
          </div>

          {/* Teams/City (optional) */}
          <div className="rounded-2xl border bg-white p-6 opacity-80">
            <h3 className="text-xl font-semibold">City / Teams <span className="text-xs text-gray-500">(coming soon)</span></h3>
            <p className="mt-2 text-sm text-gray-600">For partners and mobility programs.</p>
            <div className="mt-4">
              <span className="text-4xl font-extrabold">Custom</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>• Coverage dashboards</li>
              <li>• API & integrations</li>
              <li>• Priority city rollout</li>
            </ul>
            <a href="#cta" className="mt-6 block w-full rounded-xl border px-4 py-3 text-center font-medium hover:bg-gray-50">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
