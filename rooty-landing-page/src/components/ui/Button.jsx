export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}) {
  // Base styles
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none disabled:opacity-60";

  // Size variants
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Color variants
  const variants = {
    primary: "bg-black text-white hover:opacity-90",
    secondary:
      "bg-transparent border border-black text-black hover:bg-black hover:text-white",
    accent:
      "bg-[var(--color-primary)] text-white hover:opacity-90", // utilise ta couleur principale
  };

  // Combine classes
  const combined =
    `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  // Render as link or button
  if (href) {
    return (
      <a href={href} className={combined} onClick={onClick} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combined}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
