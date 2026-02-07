import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-black">
      <h1 className="text-4xl font-bold text-zinc-100 font-display mb-2">404</h1>
      <p className="text-zinc-400 mb-6">This page could not be found.</p>
      <Link
        href="/"
        className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2"
      >
        Back to home
      </Link>
      <nav className="mt-8 flex gap-6 text-sm text-zinc-500" aria-label="Other pages">
        <Link href="/blog" className="hover:text-zinc-300">Blog</Link>
        <Link href="/projects" className="hover:text-zinc-300">Projects</Link>
        <Link href="/about" className="hover:text-zinc-300">About</Link>
        <Link href="/contact" className="hover:text-zinc-300">Contact</Link>
      </nav>
    </div>
  );
}
