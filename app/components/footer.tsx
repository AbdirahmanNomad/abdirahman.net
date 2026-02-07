export function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-auto" role="contentinfo">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <p className="text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Abdirahman Ahmed. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
