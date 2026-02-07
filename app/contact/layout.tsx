import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description: "Get in touch with Abdirahman Ahmed - Email, GitHub, Twitter, Facebook, Instagram.",
	alternates: { canonical: "https://abdirahman.net/contact" },
	openGraph: { url: "https://abdirahman.net/contact" },
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
