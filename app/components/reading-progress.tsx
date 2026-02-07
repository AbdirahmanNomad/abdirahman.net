"use client";

import { useEffect, useRef, useState } from "react";
import { GA_EVENTS } from "@/util/ga";

const DEFAULT_THRESHOLDS = [25, 50, 75, 100];

type Props = {
  /** Optional slug for GA reading_progress events (e.g. blog post) */
  postSlug?: string;
  /** Report progress at these thresholds (0-100). Fires once per threshold. */
  reportAt?: number[];
};

export function ReadingProgress({
  postSlug,
  reportAt = DEFAULT_THRESHOLDS,
}: Props) {
  const [progress, setProgress] = useState(0);
  const reportedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const reported = reportedRef.current;
    const thresholds = reportAt.length ? reportAt : DEFAULT_THRESHOLDS;

    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const percent = height > 0 ? Math.min(100, (winScroll / height) * 100) : 0;
      setProgress(percent);

      thresholds.forEach((threshold) => {
        if (percent >= threshold && !reported.has(threshold)) {
          reported.add(threshold);
          GA_EVENTS.readingProgress(Math.round(percent), postSlug);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reportAt is optional and stable in practice
  }, [postSlug]);

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-0.5 bg-zinc-500 transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden
    />
  );
}
