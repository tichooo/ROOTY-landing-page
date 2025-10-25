import { Link } from 'react-router-dom';

export default function Button({
  children,
  href,
  to,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
}) {
  // Base styles (added transform + focus ring + smoother transition)
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold " +
    "transition-all duration-200 ease-out will-change-transform " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "disabled:opacity-60 disabled:pointer-events-none";

  // Sizes
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Variants (added lift + shadow on hover, slight press on active)
  const variants = {
    primary:
      "bg-black text-white " +
      "hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95 " +
      "active:translate-y-0 active:shadow-md focus-visible:ring-black",
    secondary:
      "bg-transparent border border-black text-black " +
      "hover:bg-black hover:text-white " +
      "hover:-translate-y-0.5 hover:shadow " +
      "active:translate-y-0 active:shadow-none focus-visible:ring-black",
    accent:
      "bg-[var(--color-primary)] text-white " +
      "hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95 " +
      "active:translate-y-0 active:shadow-md focus-visible:ring-[var(--color-primary)]",
  };

  const combined = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combined} onClick={onClick} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combined} onClick={onClick} aria-disabled={disabled}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combined} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
