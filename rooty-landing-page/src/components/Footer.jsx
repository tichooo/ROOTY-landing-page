import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Rooty.</p>
        <div className="flex gap-4">
          <a className="hover:text-gray-800" href="/privacy">
            {t("footer_privacy")}
          </a>
          <a className="hover:text-gray-800" href="/terms">
            {t("footer_terms")}
          </a>
          <button
            className="hover:text-gray-800"
            onClick={() => (window.location.href = "mailto:hello@rooty.app")}
          >
            {t("footer_contact")}
          </button>
        </div>
      </div>
    </footer>
  );
}
