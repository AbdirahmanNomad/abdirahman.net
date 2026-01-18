"use client";
import { Github, Mail, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Mail size={20} />,
		href: "mailto:hello@abdirahman.net",
		label: "Email",
		handle: "hello@abdirahman.net",
	},
	{
		icon: <Twitter size={20} />,
		href: "https://x.com/abdirahmaanone",
		label: "Twitter",
		handle: "@abdirahmaanone",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/AbdirahmanNomad",
		label: "Github",
		handle: "AbdirahmanNomad",
	},
	{
		icon: <Facebook size={20} />,
		href: "https://www.facebook.com/abdirahmanone/",
		label: "Facebook",
		handle: "@abdirahmanone",
	},
	{
		icon: <Instagram size={20} />,
		href: "https://instagram.com/abdirahmanone",
		label: "Instagram",
		handle: "@abdirahmanone",
	},
];

export default function Contact() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto py-32">
				<div className="w-full max-w-6xl mx-auto mt-32">
					<div className="mb-16 text-center">
						<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl font-display mb-4">
							Get in Touch
						</h1>
						<p className="text-xl text-zinc-400 mb-6">
							Connect with Abdirahman Ahmed through social media or email
						</p>
						<p className="text-zinc-400">
							For inquiries, collaborations, or just to say hello, reach out via any of the channels below.
						</p>
					</div>

					<div className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
						{socials.map((s, index) => (
							<Card key={index}>
								<Link
									href={s.href}
									target="_blank"
									className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
								>
									<span
										className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
										aria-hidden="true"
									/>
									<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
										{s.icon}
									</span>
									<div className="z-10 flex flex-col items-center">
										<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
											{s.handle}
										</span>
										<span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
											{s.label}
										</span>
									</div>
								</Link>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
