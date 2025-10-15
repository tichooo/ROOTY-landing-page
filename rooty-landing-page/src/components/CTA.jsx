import { useState } from "react";
import Loading from "./Loading";

export default function CTA() {
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");

  function isValidEmail(value) {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (res.ok && json.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Get early access</h2>
        <p className="mt-3 text-gray-600">
          Join the waitlist and be first to try Rooty in your city.
        </p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            required
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border px-4 py-3"
          />
          <button
            disabled={
              status === "loading" ||
              status === "success" ||
              !isValidEmail(email)
            }
            className="rounded-xl px-6 py-3 text-white font-medium disabled:opacity-60 hover:opacity-90 transition flex items-center justify-center gap-2"
            style={{ backgroundColor: "var(--color-primary, #16a34a)" }} // fallback to emerald
          >
            {status === "loading" ? (
              <>
                <Loading size={18} />
                <span>Submitting...</span>
              </>
            ) : status === "success" ? (
              "You're in! 🎉"
            ) : (
              "Join waitlist"
            )}
          </button>
        </form>

        {!isValidEmail(email) && email.length > 0 && (
          <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
        )}

        {status === "error" && (
          <p className="mt-2 text-red-600">Something went wrong. Try again.</p>
        )}
        <p className="mt-3 text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
