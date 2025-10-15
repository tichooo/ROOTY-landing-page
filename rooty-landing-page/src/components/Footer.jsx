export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Rooty.</p>
        <div className="flex gap-4">
          <a className="hover:text-gray-800" href="#">Privacy</a>
          <a className="hover:text-gray-800" href="#">Terms</a>
          <a className="hover:text-gray-800" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
