"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/lib/mdx-components";

interface MdxProps {
  source: MDXRemoteSerializeResult;
}

export function Mdx({ source }: MdxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="mdx animate-pulse min-h-[200px] rounded bg-zinc-800/50" aria-hidden />;
  }
  return (
    <div className="mdx">
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}
