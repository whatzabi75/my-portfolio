"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponseData {
  temperature: number;
  response: string;
  expected_answer?: string | null;
  similarity?: number | null;
}

export default function TemperatureDemo() {
  const [question, setQuestion] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/temperature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, temperature }),
      });
      const data = await res.json();
      setResponses((prev) => [data, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (temp: number) => {
    if (temp > 0.7) return "bg-orange-100 text-orange-700 border-orange-300";
    if (temp > 0.3) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-green-100 text-green-700 border-green-300";
  };

  const badgeLabel = (temp: number) => {
    if (temp > 0.7) return "Creative";
    if (temp > 0.3) return "Balanced";
    return "Stable";
  };

  const sampleQuestions = [
    "How do I reset my password?",
    "How do I update my billing address?",
    "How do I cancel my subscription?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">
          Temperature Consistency Demo
        </h1>
        <p className="text-gray-600 mb-6">
          See how an LLM’s responses evolve from creative to precise as you lower the
          temperature. Try one of these sample questions:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {sampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setQuestion(q)}
              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm rounded-full transition"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a support-related question..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature: {temperature.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0 (Deterministic)</span>
            <span>1 (Creative)</span>
          </div>
        </div>

        {/* Expected Answer */}
        {responses.length > 0 && responses[0].expected_answer && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
            <p className="text-sm font-semibold text-gray-700">Expected Answer:</p>
            <p className="text-gray-800 text-sm mt-1">
              {responses[0].expected_answer}
            </p>
          </div>
        )}

        {/* Response Stack */}
        <div className="space-y-3">
          <AnimatePresence>
            {responses.map((res, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`border rounded-2xl p-4 shadow-sm ${badgeColor(
                  res.temperature
                )}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">
                    Temperature: {res.temperature.toFixed(1)}
                  </span>
                  <span className="text-sm font-semibold">
                    {badgeLabel(res.temperature)}
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-line">{res.response}</p>
                {res.similarity !== null && (
                  <p className="text-sm text-gray-700 mt-2">
                    Match Score:{" "}
                    <span className="font-semibold">
                      {res.similarity?.toFixed(1)}%
                    </span>
                  </p>
                )}
                {res.similarity === null && (
                  <p className="text-sm text-gray-500 mt-2 italic">
                    No reference available — free-form response.
                  </p>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}