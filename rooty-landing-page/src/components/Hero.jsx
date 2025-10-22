import FadeIn from "./motion/FadeIn";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(72,204,189,0.08), white)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        

        <FadeIn mode="onMount" delay={0.1}>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Rooty finds micromobility-friendly paths, avoids dangerous roads, and shows bike lanes, parking and charging spots.
          </p>
        </FadeIn>

        <FadeIn mode="onMount" delay={0.2}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="#cta" variant="accent" size="md">
              Get early access
            </Button>
            <Button href="#features" variant="secondary" size="md">
              See features
            </Button>
          </div>
        </FadeIn>

        <FadeIn mode="onMount" delay={0.3}>
          <div className="mt-12 mx-auto max-w-4xl rounded-2xl border bg-white p-4 shadow-sm">
            <div className="aspect-[16/9] w-full rounded-xl bg-gray-100 grid place-items-center">
              <span className="text-gray-500">App preview (add screenshot/video later)</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
