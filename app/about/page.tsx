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
									<h2 className="text-2xl font-bold text-zinc-100 mb-8">Skills & Technologies</h2>
									
									{/* Frontend Technologies */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-blue-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Frontend</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "MDX", "Server Components"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Backend Technologies */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-green-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Backend</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Python", "FastAPI", "Node.js", "Express.js", "REST APIs", "SQLite", "PostgreSQL", "PostGIS", "Redis", "Upstash"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* API Development & Tools */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-purple-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">API Development</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["RapidAPI", "OpenAPI", "GraphQL", "REST", "API Gateway", "Rate Limiting", "Authentication", "JWT", "OAuth2", "API Documentation"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Design & Creative Tools */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-pink-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Design & Creative Tools</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Photoshop", "Illustrator", "Graphic Design", "UI/UX Design", "Visual Design", "Brand Design", "Digital Art"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Tools & Platforms */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-orange-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Tools & Platforms</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Git", "GitHub", "Docker", "Coolify", "Vercel", "Playwright", "n8n", "Streamlit", "CI/CD", "Serverless"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Machine Learning & AI */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Machine Learning & AI</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Machine Learning", "XGBoost", "LSTM", "Deep Learning", "AI Integration", "Model Fine-tuning", "Natural Language Processing", "Computer Vision", "Custom Algorithms", "RunPod"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Security & Cryptography */}
									<div className="mb-8">
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-yellow-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Security & Cryptography</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Cybersecurity", "Penetration Testing", "Security Auditing", "Ed25519", "Cryptography", "Authentication", "Authorization", "Data Encryption"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Specialized Skills */}
									<div>
										<div className="flex items-center gap-2 mb-4">
											<div className="w-1 h-6 bg-red-500 rounded-full"></div>
											<h3 className="text-lg font-semibold text-zinc-200">Specialized Skills</h3>
										</div>
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
											{["Fintech", "Healthcare Technology", "Pharmacogenomics", "Geographic APIs", "Media Production", "Marketing", "SEO Optimization", "Content Management"].map((tech) => (
												<div
													key={tech}
													className="px-4 py-3 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 rounded-lg border border-zinc-700/50"
												>
													<span className="text-zinc-300 text-sm font-medium">
														{tech}
													</span>
												</div>
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
