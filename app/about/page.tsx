import { Metadata } from "next";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

export const metadata: Metadata = {
	title: "About",
	description: "About Abdirahman Ahmed (Maano) - Full-stack developer and entrepreneur originally from Somalia, based in Sweden. Expert in healthcare technology, fintech APIs, and cultural preservation.",
	keywords: ["Abdirahman Ahmed", "Maano", "Somali developer", "full-stack developer", "entrepreneur", "Somalia", "Sweden"],
	openGraph: {
		title: "About Abdirahman Ahmed",
		description: "About Abdirahman Ahmed (Maano) - Full-stack developer and entrepreneur originally from Somalia, based in Sweden.",
		url: "https://abdirahman.net/about",
	},
};

export default function About() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
				<Navigation />
				<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
					<div className="mx-auto max-w-4xl mt-32 mb-32">
						<div className="mb-16">
							<h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl font-display mb-4">
								About Me
							</h1>
							<p className="text-xl text-zinc-400 mb-8">
								Abdirahman Ahmed (Maano)
							</p>
						</div>

						<div className="space-y-12">
							<Card>
								<div className="p-8">
									<h2 className="text-2xl font-bold text-zinc-100 mb-4">Background</h2>
									<p className="text-zinc-400 leading-7 mb-4">
										Abdirahman Ahmed, also known as Maano, is a professional with expertise spanning media, fintech, and full-stack development. Originally from Somalia and now based in Sweden, he combines technical skills with cultural understanding to create solutions that benefit businesses and communities, particularly diaspora populations.
									</p>
									<p className="text-zinc-400 leading-7">
										He holds a degree in Cybersecurity and is fluent in Somali, English, and Swedish. His work focuses on creating tools and platforms that make a meaningful impact, driven by a commitment to innovation and cultural preservation.
									</p>
								</div>
							</Card>

							<Card>
								<div className="p-8">
									<h2 className="text-2xl font-bold text-zinc-100 mb-4">Projects</h2>
									<p className="text-zinc-400 leading-7 mb-4">
										Abdirahman Ahmed has created numerous projects across different domains, from financial services APIs to healthcare technology and cultural preservation initiatives.
									</p>
									<p className="text-zinc-400 leading-7">
										The projects showcase expertise in API development, fintech innovation, healthcare technology, and cultural education. Each project is built to solve real problems and create value for users and communities.
									</p>
								</div>
							</Card>

							<Card>
								<div className="p-8">
									<h2 className="text-2xl font-bold text-zinc-100 mb-6">Skills & Technologies</h2>
									
									{/* Frontend Technologies */}
									<div className="mb-6">
										<h3 className="text-lg font-semibold text-zinc-200 mb-3">Frontend</h3>
										<div className="flex flex-wrap gap-3">
											{["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"].map((tech) => (
												<span key={tech} className="px-4 py-2 bg-zinc-800/50 rounded-lg text-zinc-300 text-sm font-medium border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-100 transition-colors">
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* Backend Technologies */}
									<div className="mb-6">
										<h3 className="text-lg font-semibold text-zinc-200 mb-3">Backend</h3>
										<div className="flex flex-wrap gap-3">
											{["Python", "FastAPI", "Node.js", "SQLite", "PostgreSQL", "PostGIS", "Redis", "REST APIs"].map((tech) => (
												<span key={tech} className="px-4 py-2 bg-zinc-800/50 rounded-lg text-zinc-300 text-sm font-medium border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-100 transition-colors">
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* API Development & Tools */}
									<div className="mb-6">
										<h3 className="text-lg font-semibold text-zinc-200 mb-3">API Development</h3>
										<div className="flex flex-wrap gap-3">
											{["RapidAPI", "OpenAPI", "GraphQL", "REST", "API Gateway", "Rate Limiting", "Authentication"].map((tech) => (
												<span key={tech} className="px-4 py-2 bg-zinc-800/50 rounded-lg text-zinc-300 text-sm font-medium border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-100 transition-colors">
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* Tools & Platforms */}
									<div className="mb-6">
										<h3 className="text-lg font-semibold text-zinc-200 mb-3">Tools & Platforms</h3>
										<div className="flex flex-wrap gap-3">
											{["Git", "GitHub", "Docker", "Netlify", "Vercel", "Playwright", "Machine Learning", "AI Integration"].map((tech) => (
												<span key={tech} className="px-4 py-2 bg-zinc-800/50 rounded-lg text-zinc-300 text-sm font-medium border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-100 transition-colors">
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* Specialized Skills */}
									<div>
										<h3 className="text-lg font-semibold text-zinc-200 mb-3">Specialized Skills</h3>
										<div className="flex flex-wrap gap-3">
											{["Cybersecurity", "Fintech", "Healthcare Technology", "Media Production", "Marketing", "SEO Optimization"].map((tech) => (
												<span key={tech} className="px-4 py-2 bg-zinc-800/50 rounded-lg text-zinc-300 text-sm font-medium border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-100 transition-colors">
													{tech}
												</span>
											))}
										</div>
									</div>
								</div>
							</Card>

							<Card>
								<div className="p-8">
									<h2 className="text-2xl font-bold text-zinc-100 mb-4">Personal Interests</h2>
									<p className="text-zinc-400 leading-7 mb-4">
										Passionate about traveling and supporting low-resource language development, particularly Somali language preservation and education for diaspora communities.
									</p>
									<p className="text-zinc-400 leading-7">
										Through work on Somali children's books and educational platforms, the goal is to preserve and pass on Somali heritage to the next generation, ensuring that diaspora children can learn their language and history.
									</p>
								</div>
							</Card>

							<Card>
								<div className="p-8">
									<h2 className="text-2xl font-bold text-zinc-100 mb-4">Mission</h2>
									<p className="text-zinc-400 leading-7">
										The philosophy is straightforward: to make change and create what people can benefit from. Whether building APIs that help fintech companies validate bank accounts, creating platforms that make money transfers easier for immigrants, or writing books that preserve cultural heritage - the work is driven by impact and purpose.
									</p>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
	);
}
