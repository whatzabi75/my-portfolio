"use client";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Senior Product Manager <br />
            <span className="text-blue-600">& AI Builder</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Driving innovation at the intersection of <strong>Product Management</strong> and 
            <strong> Artificial Intelligence</strong>.  
            <br />
            I design, lead, and deliver solutions that create measurable impact.
          </p>
        </div>
      </main>

    </div>
  );
}
