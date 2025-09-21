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
            <strong>AI-powered solutions</strong>. I lead cross-functional teams,
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

      {/* Skills */}
      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Product Strategy & Roadmapping",
            "AI & Machine Learning Applications",
            "Leadership & People Management",
            "Agile (Scrum, Kanban)",
            "Data-Driven Decision Making",
            "Stakeholder Management",
          ].map((item) => (
            <li
              key={item}
              className="rounded-lg border bg-gray-800 text-white px-4 py-3 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Career Highlights */}
      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold">Career Highlights</h2>
        <ul className="space-y-4">
          <li className="rounded-lg border bg-gray-100 px-4 py-4">
            🚀 Led AI customer-support initiatives delivering a{" "}
            <strong>20% increase in case deflection</strong>.
          </li>
          <li className="rounded-lg border bg-gray-100 px-4 py-4">
            🧭 Drove product strategy for a large help-portal transformation used
            by thousands of users.
          </li>
          <li className="rounded-lg border bg-gray-100 px-4 py-4">
            👥 Managed & mentored Product Owners; shipped multiple cross-team
            projects on time.
          </li>
        </ul>
      </div>
    </section>
  );
}