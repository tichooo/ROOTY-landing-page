export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛴</span>
          <span className="font-bold text-xl">Rooty</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-gray-700">Features</a>
          <a href="#pricing" className="hover:text-gray-700">Pricing</a>
          <a href="#how" className="hover:text-gray-700">How it works</a>
          <a href="#cta" className="hover:text-gray-700">Early access</a>
        </nav>
        <a href="#cta" className="inline-block rounded-xl px-4 py-2 text-white text-sm font-medium hover:opacity-90 transition" style={{backgroundColor: 'var(--color-primary)'}}>
          Join waitlist
        </a>
      </div>
    </header>
  );
}

