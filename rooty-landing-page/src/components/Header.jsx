import { useEffect, useState } from "react";
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

  const links = [
    { label: t("nav_features_main"), href: "/" },        // Page principale
    { label: t("nav_premium"), href: "/premium" },       // À créer
    { label: t("nav_faq"), href: "/faq" }                // À créer
  ];

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300",
        scrolled ? "border-b shadow-sm py-2" : "border-b border-transparent py-4",
      ].join(" ")}
    >
      {/* Barre principale */}
      <div className="w-full px-3 sm:px-6 flex items-center gap-6">

        {/* Logo (gauche) */}
        <a href="/download" className="flex items-center gap-3" aria-label="Télécharger Rooty">
          <img
            src="/img/logo192.png"
            alt="Rooty"
            className="h-12 w-auto sm:h-14 transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Nav desktop (à gauche, à la suite du logo) */}
        <nav className="hidden md:flex items-center gap-8 text-base">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="relative text-gray-700 transition-all duration-300 ease-in-out hover:text-black hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Burger mobile (à droite) */}
        <button
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-lg p-2 border hover:bg-white/90"
          aria-expanded={open}
          aria-label="Basculer le menu"
          onClick={() => setOpen(v => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t bg-white/95">
          <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col gap-2 text-base">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="py-2 text-gray-700 hover:text-black hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
