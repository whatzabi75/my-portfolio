export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to My Portfolio
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        Built with Next.js, TypeScript, and TailwindCSS 🚀
      </p>
      <button className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
        Get Started
      </button>
    </main>
  );
}