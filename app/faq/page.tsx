import { Metadata } from "next";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Breadcrumb } from "../components/breadcrumb";

export const metadata: Metadata = {
	title: "FAQ",
	description: "Frequently asked questions about Abdirahman Ahmed (Maano) - Full-stack developer, entrepreneur, music producer. Based in Sweden, originally from Somalia.",
	keywords: ["Abdirahman Ahmed", "Maano", "FAQ", "Somali developer", "contact", "freelance"],
	alternates: { canonical: "https://abdirahman.net/faq" },
	openGraph: {
		title: "FAQ - Abdirahman Ahmed",
		description: "Frequently asked questions about Abdirahman Ahmed (Maano), his work, and how to get in touch.",
		url: "https://abdirahman.net/faq",
	},
};

const faqs = [
	{
		question: "Who is Abdirahman Ahmed?",
		answer: "Abdirahman Ahmed, also known as Maano, is a full-stack developer and entrepreneur originally from Somalia, based in Stockholm, Sweden. He builds APIs, automation workflows, and open data systems. He holds a degree in Cybersecurity and is well known in Somali music and media as a producer and mogul who has helped many young artists. He works across healthcare technology, fintech APIs, cultural preservation, and security tools.",
	},
	{
		question: "Where is Abdirahman based?",
		answer: "Abdirahman is based in Stockholm, Sweden. He is originally from Somalia and works with diaspora communities and clients globally.",
	},
	{
		question: "What does Abdirahman do?",
		answer: "He builds APIs and tools (e.g. IBAN validation, DNA analysis, Somali geography API), fintech and healthcare technology, cultural preservation projects (AfSomali Foundation, Somali children's books), and security testing tools. He also runs Gobfilms, Somalia's first YouTube-verified record label, and has produced and worked with major Somali artists.",
	},
	{
		question: "How can I see his work or projects?",
		answer: "Visit the Projects page at abdirahman.net/projects for the full portfolio. Many APIs are on RapidAPI; open-source work is on GitHub (@AbdirahmanNomad). The Blog has updates and tutorials.",
	},
	{
		question: "Does Abdirahman do freelance or consulting?",
		answer: "Yes. For freelance, consulting, or collaboration inquiries, reach out via the Contact page or email hello@abdirahman.net.",
	},
	{
		question: "How can I get in touch?",
		answer: "Email hello@abdirahman.net or use the Contact page. You can also connect on GitHub, Twitter (@abdirahmaanone), Facebook, or Instagram.",
	},
];

const faqSchema = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((faq) => ({
		"@type": "Question",
		name: faq.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: faq.answer,
		},
	})),
};

export default function FaqPage() {
	return (
		<div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="mx-auto max-w-4xl mt-32 mb-32">
					<div className="mb-16">
						<Breadcrumb items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} currentPageUrl="/faq" />
						<h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl font-display mb-4">
							Frequently Asked Questions
						</h1>
						<p className="text-xl text-zinc-400 mb-8">
							Quick answers about my work, background, and how to get in touch.
						</p>
					</div>

					<div className="space-y-6">
						{faqs.map((faq, i) => (
							<Card key={i}>
								<div className="p-8">
									<h2 className="text-xl font-bold text-zinc-100 mb-3">{faq.question}</h2>
									<p className="text-zinc-400 leading-7">{faq.answer}</p>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
