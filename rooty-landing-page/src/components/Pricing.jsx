import FadeIn from "./motion/FadeIn";
import Button from "./ui/Button";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <FadeIn mode="onScroll" duration={0.3}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Lovable Plan — Free forever
          </h2>
        </FadeIn>


        <FadeIn mode="onScroll" delay={0.1}>
          <p className="mt-3 text-gray-600 text-center">
            Try Rooty with the core features riders love. No credit card required.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lovable */}
          <FadeIn mode="onScroll" repeat>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-semibold">Lovable</h3>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                  Free
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                The essentials to fall in love with Rooty.
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">Free</span>
                <span className="text-gray-500"> forever</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                <li>• Bike-lane & scooter-friendly routing</li>
                <li>• Safer route options</li>
                <li>• Parking & charging spots</li>
                <li>• No ads, privacy-first</li>
              </ul>
              <Button href="#cta" className="mt-6 block w-full" size="md" variant="accent">
                Start free
              </Button>
            </div>
          </FadeIn>

          {/* Pro (coming soon) */}
          <FadeIn mode="onScroll" repeat delay={0.05}>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg opacity-90">
              <h3 className="text-xl font-semibold">
                Pro <span className="text-xs text-gray-500">(coming soon)</span>
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                For daily commuters who want more control.
              </p>
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
              <Button className="mt-6 w-full" size="md" variant="secondary" disabled>
                Join waitlist
              </Button>
            </div>
          </FadeIn>

          {/* City / Teams (coming soon) */}
          <FadeIn mode="onScroll" repeat delay={0.1}>
            <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg opacity-90">
              <h3 className="text-xl font-semibold">
                City / Teams <span className="text-xs text-gray-500">(coming soon)</span>
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                For partners and mobility programs.
              </p>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">Custom</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-gray-700">
                <li>• Coverage dashboards</li>
                <li>• API & integrations</li>
                <li>• Priority city rollout</li>
              </ul>
              <Button href="#cta" className="mt-6 block w-full" size="md" variant="secondary">
                Contact us
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
