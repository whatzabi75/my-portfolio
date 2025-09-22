import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    // Hard-reset background and text so nothing “bleeds” in from other pages
    <section className="mx-auto max-w-5xl bg-white text-gray-900 px-6 py-12">
      {/* Top: Photo + Bio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Photo */}
        <div className="flex justify-center md:justify-start">
          <div className="relative h-48 w-48 overflow-hidden rounded-full ring-4 ring-blue-400">
            <Image
              src="/profile-placeholder.jpg" // put your image in /public
              alt="Professional profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Bio + CTA */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">About Me</h1>
          <p className="text-lg leading-relaxed text-gray-800">
            I’m a <strong>Senior Product Manager</strong> with deep experience in
            building software products and an active focus on{" "}
            <strong>AI-powered solutions</strong>. I lead a team of Product Owners,
            align stakeholders, and ship measurable outcomes—balancing strategy,
            execution, and customer value.
          </p>

          <Link
            href="/cv.pdf"
            target="_blank"
            download
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            📄 View My CV
          </Link>
        </div>
      </div>

      {/* Skills & Career Highlights in two-column grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Career Highlights */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Career Highlights</h2>
          <ul className="space-y-4">
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🚀 Drove prototyping and implementation of <strong>AI-powered solutions</strong>
              (recommendation engines, chatbots) that improved customer experience and delivered
              measurable efficiency gains.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              💰 Owned full <strong>product portfolio and P&amp;L responsibility</strong>, managing
              multimillion-euro budgets and ensuring profitable growth through strategic roadmap decisions.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🧭 Led <strong>large-scale product transformation</strong> initiatives such as the Salesforce Help
              Portal, impacting thousands of users and aligning global cross-functional teams.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              👥 <strong>Managed and mentored teams</strong> of Product Owners and contributors, building
              high-performing teams that delivered complex programs on time.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🌍 Defined and executed <strong>go-to-market strategies</strong> for new products and features,
              building partnerships and driving adoption across international markets.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🤝 Partnered with <strong>executives and global stakeholders</strong> to align strategy,
              secure investment, and deliver outcomes tied to corporate goals.
            </li>
          </ul>
        </div>

        {/* Skills */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Product Strategy & Roadmapping",
              "AI & Machine Learning Applications",
              "Leadership & People Management",
              "Portfolio & P&L Ownership",
              "Go-to-Market Strategy & Business Development",
              "Agile & Cross-Functional Team Leadership",
              "Stakeholder & Executive Communication",
              "Data-Driven Decision Making",
            ].map((item) => (
              <li
                key={item}
                className="rounded-lg bg-blue-600 text-white px-4 py-3 text-sm font-medium shadow hover:bg-blue-700 transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}