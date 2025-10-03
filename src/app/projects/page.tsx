import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Emotion Detection",
      description: "A Python tool that analyzes emotions in text using a DistilRoBERTa Transformer model fine-tuned on emotion classification, provided via Hugging Face.",
      tech: ["Python", "Flask", "NLP", "DistilRoBERTa Emotion Model"],
      image: "/emotion-detection.jpg",
      link: "/projects/emotion-detector",
    },
    {
      title: "Stock Market Analyzer",
      description: "A Python tool that visualizes and analyzes stock data. It fetches historical stock data using yfinance and provides insights using the OpenAI GPT-4o-mini LLM, all wrapped in a Next.js frontend.",
      tech: ["Python", "yfinance", "GPT-4o-mini", "Next.js"],
      image: "/stock-analyzer.jpg",
      link: "/projects/stock-analyzer",
    },
    {
      title: "Custom LLM Chatbot",
      description: "A Python tool that trains a RAG-based chatbot using custom documents. It leverages LangChain for document processing and integrates with a Hugging Face LLM for generating responses, all presented in a Next.js frontend.",
      tech: ["Python", "Flask", "PyPDF2", "VectorDB", "GPT-4o-mini", "LangChain retriever"],
      image: "/rag-deployment.jpg",
      link: "/projects/rag-upload",
    },
    {
      title: "Stochastic vs. Deterministic Output",
      description: "A Proof of Concept that allows modeleing the LLMs temperature to minimize the delta between two outputs. Use case: Support Agent recommendation consistency!",
      tech: ["Python", "Flask", "GPT-3.5-turbo"],
      image: "/under-construction.jpg",
      link: "/projects/temperature-poc",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Projects</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm overflow-hidden bg-white flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 text-sm mb-4 flex-1">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              <Link
                href={project.link}
                target="_blank"
                className="inline-block mt-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}