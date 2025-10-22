import { useEffect, useState } from "react";
import Button from "./ui/Button";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300",
        scrolled ? "border-b shadow-sm py-2" : "border-b border-transparent py-4",
      ].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6 flex items-center">
        {/* Logo (left) */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/logo192.png"
            alt="Rooty"
            className="h-14 w-auto sm:h-16 transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Nav desktop (centered) */}
        <nav className="hidden md:flex items-center gap-8 text-base absolute left-1/2 transform -translate-x-1/2">
          {[
            { label: t("nav_features"), href: "#features" },
            { label: t("nav_pricing"), href: "#pricing" },
            { label: t("nav_how"), href: "#how" },
            { label: t("nav_early"), href: "#cta" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="relative text-gray-700 transition-all duration-300 hover:text-black hover:drop-shadow-[0_1px_4px_rgba(0,0,0,0.20)]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA desktop (right) */}
        <div className="ml-auto hidden md:block">
          <Button
            href="#cta"
            className="inline-block"
            variant="accent"
            size="md"
          >
            {t("cta_button")}
          </Button>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-lg p-2 border hover:bg-white/90"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-white/95">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm">
            <a onClick={() => setOpen(false)} href="#features" className="py-2">
              {t("nav_features")}
            </a>
            <a onClick={() => setOpen(false)} href="#pricing" className="py-2">
              {t("nav_pricing")}
            </a>
            <a onClick={() => setOpen(false)} href="#how" className="py-2">
              {t("nav_how")}
            </a>
            <Button
              onClick={() => setOpen(false)}
              href="#cta"
              className="mt-2 inline-block"
              variant="accent"
              size="sm"
            >
              {t("cta_button")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
