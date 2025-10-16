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
            I’m a <strong>Senior Product Leader</strong> with deep experience in
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
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
        {/* Career Highlights */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Career Highlights</h2>
          <ul className="space-y-4">
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🚀 Prototyped and delivered <strong>AI-powered solutions</strong> (Agents, recommendation engines) driving efficiency gains.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              💰 Owned <strong>portfolio &amp; P&amp;L</strong>, managed multimillion-dollar budgets and profitable growth.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🧭 Led <strong>global product transformation</strong> impacting thousands of users.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              👥 <strong>Managed and mentored teams</strong> of Product Owners to deliver complex AI programs.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🌍 Executed <strong>go-to-market strategies</strong> for new products, driving adoption across markets.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🌍 Launched products <strong>in new geographies</strong> and expanded sales channels.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🤝 <strong>Increased profitability</strong> by consolidating portfolios and focusing on key markets.
            </li>
            <li className="rounded-lg border bg-gray-100 px-4 py-4">
              🤝 Partnered with <strong>executives and stakeholders</strong> to align strategy and secure investment.
            </li>
          </ul>
        </div>

        {/* Skills + Education + Certificates*/}
        <div className="flex flex-col space-y-8">
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

          {/* Education*/}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Education</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Master Business Administration (MBA)",
                "B.Sc. Communication Technology",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border bg-gray-100 px-4 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Certificates*/}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Certificates</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Salesforce Certified Agentforce Specialist",
                "Oxford Artificial Intelligence Program",
                "Mini-Master Digital Product Mangement",
                "Certified SAFe Agile Product Manager",
                "IBM AI Developer Professional Certificate",
                "Dare to Lead Leadership Program",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border bg-gray-100 px-4 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}