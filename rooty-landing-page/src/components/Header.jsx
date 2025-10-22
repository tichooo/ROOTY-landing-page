import { useEffect, useState } from "react";
import Button from "./ui/Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ombre + fond plus opaque après un petit scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 backdrop-blur",
        "supports-[backdrop-filter]:bg-white/60",
        scrolled ? "bg-white/80 border-b shadow-sm" : "border-b border-white/20",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl">🛴</span>
          <span className="font-bold text-xl">Rooty</span>
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-gray-800">Features</a>
          <a href="#pricing" className="hover:text-gray-800">Pricing</a>
          <a href="#how" className="hover:text-gray-800">How it works</a>
          <a href="#cta" className="hover:text-gray-800">Early access</a>
        </nav>

        {/* CTA desktop */}
        <Button
          href="#cta"
          className="hidden md:inline-block"
          variant="accent"
          size="sm"
        >
          Join waitlist
        </Button>

        {/* Burger mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 border hover:bg-gray-50"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm">
            <a onClick={() => setOpen(false)} href="#features" className="py-2">Features</a>
            <a onClick={() => setOpen(false)} href="#pricing" className="py-2">Pricing</a>
            <a onClick={() => setOpen(false)} href="#how" className="py-2">How it works</a>
            <Button onClick={() => setOpen(false)} href="#cta" className="mt-2 inline-block" variant="accent" size="sm">
              Join waitlist
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}


