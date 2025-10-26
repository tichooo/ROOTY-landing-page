import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Button from "./ui/Button";
import i18n from "../i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav_features_main"), href: "/" },
    { label: t("nav_premium"), href: "/premium" },
    { label: t("nav_faq"), href: "/faq" },
  ];

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[9999] bg-white/90 backdrop-blur-md transition-all duration-300",
        scrolled ? "border-b shadow-sm py-2" : "border-b border-transparent py-4",
      ].join(" ")}
    >
      {/* Barre principale */}
      <div className="w-full px-3 sm:px-6 flex items-center gap-6">
        {/* Logo (gauche) */}
        <Link to="/" className="flex items-center gap-3" aria-label="Rooty Home">
          <img
            src="/img/logo192.png"
            alt="Rooty"
            className="h-12 w-auto sm:h-14 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Liens desktop */}
        <nav className="hidden md:flex items-center gap-8 text-base">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={[
                "relative transition-all duration-300 ease-in-out hover:text-black hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
                location.pathname === href ? "text-black" : "text-gray-700",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Boutons desktop (droite) */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {/* Sélecteur de langue */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
            >
              <span className="font-medium">
                {i18n.language === "fr" ? "FR" : "EN"}
              </span>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bouton connexion */}
          <Button to="/auth" variant="secondary">
            {t("nav_login", "Connexion")}
          </Button>
        </div>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-lg p-2 border hover:bg-white/90"
          aria-expanded={open}
          aria-label="Basculer le menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t bg-white/95">
          <div className="mx-auto max-w-6xl px-6 py-3 flex flex-col gap-3 text-base">
            {/* Liens navigation mobile */}
            {links.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className={[
                  "py-2 transition hover:text-black hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
                  location.pathname === href ? "text-black" : "text-gray-700",
                ].join(" ")}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            <hr className="my-2 border-gray-200" />

            {/* Sélecteur de langue mobile */}
            <div className="flex justify-between items-center px-2 py-2">
              <span className="font-medium text-gray-700">
                {t("nav_language", "Langue")}
              </span>
              <select
                className="border rounded-md px-2 py-1 bg-white text-gray-700"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bouton connexion mobile */}
            <div className="mt-2">
              <Button
                to="/auth"
                variant="secondary"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                {t("nav_login", "Connexion")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
