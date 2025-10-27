import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import Button from "./ui/Button";
import i18n from "../i18n";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();

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

          {/* Bouton connexion ou profil */}
          {user ? (
            <div className="relative">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                aria-label="Profile menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" fill="#6B7280"/>
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z" fill="#6B7280"/>
                </svg>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">{t("nav_profile_account", "Mon compte")}</p>
                  </div>
                  <Link
                    to="/premium"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    {t("nav_profile_premium", "Premium")}
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => {
                      logout();
                      setProfileMenuOpen(false);
                    }}
                  >
                    {t("nav_profile_logout", "Se déconnecter")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button to="/auth" variant="secondary">
              {t("nav_login", "Connexion")}
            </Button>
          )}
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

            {/* Bouton connexion ou profil mobile */}
            <div className="mt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="8" r="4" fill="#6B7280"/>
                          <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21H4V20Z" fill="#6B7280"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                        <p className="text-xs text-gray-500">{t("nav_profile_account", "Mon compte")}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/premium"
                    className="block w-full text-center py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {t("nav_profile_premium", "Premium")}
                  </Link>
                  <button
                    className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    {t("nav_profile_logout", "Se déconnecter")}
                  </button>
                </div>
              ) : (
                <Button
                  to="/auth"
                  variant="secondary"
                  className="w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  {t("nav_login", "Connexion")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
