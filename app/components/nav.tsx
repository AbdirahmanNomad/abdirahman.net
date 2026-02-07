"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { GA_EVENTS } from "@/util/ga";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
							onClick={() => GA_EVENTS.navClick("/projects", "Projects")}
						>
							Projects
						</Link>
						<Link
							href="/blog"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
							onClick={() => GA_EVENTS.navClick("/blog", "Blog")}
						>
							Blog
						</Link>
						<Link
							href="/about"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
							onClick={() => GA_EVENTS.navClick("/about", "About")}
						>
							About
						</Link>
						<Link
							href="/faq"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
							onClick={() => GA_EVENTS.navClick("/faq", "FAQ")}
						>
							FAQ
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
							onClick={() => GA_EVENTS.navClick("/contact", "Contact")}
						>
							Contact
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-300 hover:text-zinc-100"
						aria-label="Back to home"
						onClick={() => GA_EVENTS.navClick("/", "Back to home")}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};
