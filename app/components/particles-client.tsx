"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(() => import("./particles"), { ssr: false });

export default function ParticlesClient({
	className,
	quantity = 50,
}: {
	className?: string;
	quantity?: number;
}) {
	return <Particles className={className} quantity={quantity} />;
}
