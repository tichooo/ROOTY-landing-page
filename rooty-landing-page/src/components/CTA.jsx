import { useState } from "react";
import Loading from "./Loading";
import Button from "./ui/Button";
// Si tu utilises les animations (facultatif, supprime la ligne suivante si tu ne l'as pas)
import FadeIn from "./motion/FadeIn";

export default function CTA() {
  const [status, setStatus] = useState("idle");   // idle | loading | success | error
  const [email, setEmail] = useState("");

  function isValidEmail(value) {
    return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!isValidEmail(email) || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setStatus("success");
        // Optionnel: vider le champ si tu veux
        // setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const ButtonLabel =
    status === "loading"
      ? "Submitting..."
      : status === "success"
      ? "You're in! 🎉"
      : "Join waitlist";

  return (
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        {/* Enlève FadeIn si tu ne veux pas d'animation / si tu n'as pas le composant */}
        <FadeIn mode="onScroll" duration={0.3}>
          <h2 className="text-3xl sm:text-4xl font-bold">Get early access</h2>
        </FadeIn>


        <FadeIn mode="onScroll" delay={0.05}>
          <p className="mt-3 text-gray-600">
            Join the waitlist and be first to try Rooty in your city.
          </p>
        </FadeIn>

        <FadeIn mode="onScroll" repeat delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3"
            aria-live="polite"
          >
            <input
              required
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border px-4 py-3"
              aria-invalid={email.length > 0 && !isValidEmail(email)}
              aria-describedby="email-help"
            />

            <Button
              type="submit"
              disabled={status === "loading" || status === "success" || !isValidEmail(email)}
              className="w-full flex items-center justify-center gap-2"
              size="md"
              variant="accent"
            >
              {status === "loading" && <Loading size={18} />}
              <span>{ButtonLabel}</span>
            </Button>
          </form>
        </FadeIn>

        {/* Helper pour email invalide */}
        {!isValidEmail(email) && email.length > 0 && (
          <p id="email-help" className="mt-2 text-sm text-red-600">
            Please enter a valid email address.
          </p>
        )}

        {/* Message d'erreur serveur */}
        {status === "error" && (
          <p className="mt-2 text-red-600">Something went wrong. Try again.</p>
        )}

        <FadeIn mode="onScroll" delay={0.15}>
          <p className="mt-3 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
        </FadeIn>
      </div>
    </section>
  );
}
