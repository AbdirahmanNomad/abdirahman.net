"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export function BlogViewCount({
	initialCount,
	slug,
}: {
	initialCount: number;
	slug: string;
}) {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		setCount(initialCount);
	}, [initialCount]);
	useEffect(() => {
		fetch("/api/incr", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug, type: "blog" }),
		})
			.then((r) => r.json())
			.then((res: { incremented?: boolean; count?: number }) => {
				if (res.incremented && typeof res.count === "number") setCount(res.count);
			})
			.catch(() => {});
	}, [slug]);

	return (
		<span className="flex items-center gap-1 text-sm text-zinc-500">
			<Eye className="w-4 h-4" />{" "}
			{Intl.NumberFormat("en-US", { notation: "compact" }).format(count)}
		</span>
	);
}
