"use client";

import { useState } from "react";

export default function RagDeploymentPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const [file, setFile] = useState<File | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        e.target.value = "";
        setFile(null);
        return;
      }
      if (selectedFile.size > 16 * 1024 * 1024) {
        alert("File size exceeds 16MB limit.");
        e.target.value = "";
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadMessage("Please select a PDF file to upload.");
      return;
    }
    setUploadMessage("The upload was successful");
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF file before submitting.");
      return;
    }
    setIsTraining(true);
    setIsTrained(false);
    try {
      const formData = new FormData();
      formData.append("file", file);
        const response = await fetch(`${BACKEND_URL}/rag-upload`, {
        method: "POST",
        body: formData,
        // Do not set Content-Type header; browser will set it for multipart/form-data
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Upload failed: ${errText}`);
      }
      setIsTraining(false);
      setIsTrained(true);
    } catch (error: unknown) {
      setIsTraining(false);
      setIsTrained(false);
      const errMsg = error instanceof Error ? error.message : "An error occurred during upload.";
      alert(errMsg);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = inputValue.trim();
    setChatHistory((prev) => [...prev, { user: userMessage, bot: "..." }]);
    setInputValue("");

    try {
        const response = await fetch(`${BACKEND_URL}/rag-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: userMessage })
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Chat request failed: ${errText}`);
      }
      const data = await response.json();
      const answer = data.answer || "No answer returned from backend.";
      setChatHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].bot = answer;
        return newHistory;
      });
    } catch (error: unknown) {
      setChatHistory((prev) => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].bot =
          error instanceof Error ? error.message : "An error occurred while fetching the answer.";
        return newHistory;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="mx-auto max-w-4xl bg-white text-gray-900 px-6 py-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">RAG based custom LLM</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Please upload a file in PDF format (size limit 16MB)
      </p>
      <p className="text-sm text-gray-600 mb-6 text-center">
        The program will read the PDF, break it into chunks, and create a vector database for retrieval using a special index (FAISS).<br />
      </p>

      <div className="flex flex-col items-center gap-2 mb-6">
        {uploadMessage && (
          <div
            className={`text-sm font-medium ${
              uploadMessage.toLowerCase().includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {uploadMessage}
          </div>
        )}
        <div className="flex justify-center gap-4 w-full">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            type="button"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleSubmit}
          disabled={!file || isTraining}
          className={`px-6 py-2 rounded-lg text-white text-sm transition ${
            !file || isTraining
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          type="button"
        >
          Submit
        </button>
      </div>

      {isTraining && (
        <div className="flex flex-col items-center mb-8 text-blue-600">
          <svg
            className="animate-spin h-8 w-8 mb-2 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-sm font-medium">The model is currently learning</p>
        </div>
      )}

      {isTrained && (
        <div className="mb-8 text-center text-green-600 font-semibold">
          Training complete! You can now ask questions below.
        </div>
      )}

      {isTrained && (
        <div className="max-w-3xl mx-auto bg-gray-50 border rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-700 mb-4">
            Please ask any questions related to the content of the file that you uploaded
          </p>

          <div className="h-64 overflow-y-auto mb-4 border rounded p-4 bg-white">
            {chatHistory.length === 0 && (
              <p className="text-gray-400 text-sm italic">No messages yet. Start by typing a question below.</p>
            )}
            {chatHistory.map((entry, idx) => (
              <div key={idx} className="mb-3">
                <p className="text-sm font-medium text-blue-700">You:</p>
                <p className="text-sm mb-1">{entry.user}</p>
                <p className="text-sm font-medium text-gray-700">Bot:</p>
                <p className="text-sm">{entry.bot}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-grow rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </section>
  );
}