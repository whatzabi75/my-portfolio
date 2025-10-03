"use client";

import { useState } from "react";

type EmotionResult = {
  dominant_emotion: string;
  scores: Record<string, number>;
  recommendation?: string; // optional
};

export default function EmotionDetectorPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://backend-code-production-77c7.up.railway.app/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Probability Distribution
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm text-gray-600 mb-6 text-center">
        This tool lets users ask an LLM a question and then adjust the model temperature parameter, which controls the probability distribution of its output (i.e., how deterministic vs. creative the responses are).<br></br>By repeating the same question, the tool calculates the differences between responses at various temperature settings. 
        <br></br>I may extend this project with Retrieval-Augmented Generation (RAG) to limit the LLM data sources, reflecting a more realistic customer service use case where consistency and repeatability are critical.
<br></br>
<br></br>
          Please ask your first question.
        </label>
        <textarea
          className="w-full rounded border px-4 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a question..."
          required
        />

        <button
          type="submit"
          disabled
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">
            Dominant Emotion: {result.dominant_emotion ?? "—"}
          </h2>

          {result.recommendation && (
            <p className="text-lg font-medium text-gray-800 mb-4">
              📌 Recommendation: {result.recommendation}
            </p>
          )}
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-800 mb-2">Detailed Value Breakdown:</p>
            <ul className="text-lg font-medium text-gray-800 list-disc pl-6 space-y-1">
              {Object.entries(result.scores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([label, score]) => (
                  <li key={label} className="text-gray-800">
                    {label.charAt(0).toUpperCase() + label.slice(1)}:{" "}
                    {Number(score).toFixed(3)}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
