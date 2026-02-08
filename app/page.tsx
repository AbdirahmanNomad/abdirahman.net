import Link from "next/link";
import React from "react";
import ParticlesClient from "./components/particles-client";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <ParticlesClient
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={50}
      />
      {/* LCP-friendly: no opacity:0 / animation so Lighthouse can detect a real hero element */}
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent bg-white cursor-default text-edge-outline font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Abdirahman
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in space-y-4">
        <h2 className="text-sm text-zinc-500 ">
          Building{" "}
          <Link
            target="_blank"
            href="https://rapidapi.com/gobmedia2/api/iban-swift-validator-51-914-banks"
            className="underline duration-500 hover:text-zinc-300"
          >
            IBAN & SWIFT Validator
          </Link> for 51,000+ banks to help fintech and payment companies.
        </h2>
      </div>
    </div>
  );

}
