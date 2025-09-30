"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockAnalyzerPage() {
  const [symbol, setSymbol] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [range, setRange] = useState("6mo");
  const [stockData, setStockData] = useState<{ date: string; close: number }[]>([]);
  

  // Placeholder data
  const companySummary =
    "Apple Inc. is a global technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories. It also sells a variety of software, services, and digital content. Apple’s flagship product, the iPhone, accounts for a major share of its revenue, complemented by the Mac, iPad, Apple Watch, and services like iCloud, Apple Music, and the App Store. The company is known for its strong ecosystem that encourages customer loyalty and repeat purchases. Apple invests heavily in research and development, with a focus on areas such as silicon design, augmented reality, and artificial intelligence. With a global supply chain and extensive retail presence, Apple maintains a leading position in consumer electronics. The company is also focused on sustainability, aiming for carbon neutrality across its entire business and manufacturing supply chain by 2030.";

  const column1 = [
    { label: "Price-to-Earnings (P/E)", value: "28.5" },
    { label: "Price-to-Book (P/B)", value: "7.2" },
    { label: "Price-to-Sales (P/S)", value: "6.5" },
    { label: "Price-to-Earnings-Growth (PEG)", value: "1.8" },
    { label: "P/E Relative to Industry", value: "1.2x" },
    { label: "Free Cash Flow (FCF) Yield", value: "3.5%" },
    { label: "Earnings Per Share (EPS)", value: "$6.12" },
    { label: "Return on Equity (ROE)", value: "49.8%" },
    { label: "Return on Assets (ROA)", value: "12.5%" },
    { label: "Return on Capital Employed (ROCE)", value: "27.3%" },
  ];

  const column2 = [
    { label: "Gross Profit Margin", value: "46.7%" },
    { label: "Operating Margin", value: "32.5%" },
    { label: "Net Profit Margin", value: "25.1%" },
    { label: "Debt-to-Equity (D/E)", value: "1.5" },
    { label: "Debt-to-Asset", value: "0.45" },
    { label: "Interest Coverage", value: "12.3x" },
    { label: "Revenue Growth Rate", value: "7.8%" },
    { label: "EPS Growth Rate", value: "9.4%" },
    { label: "Dividend Yield", value: "0.55%" },
    { label: "Asset Turnover", value: "1.2x" },
  ];

  const analystRatings = { buy: 22, hold: 5, sell: 3 };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    await fetchStockHistory(symbol, "6mo");
  };

  // Dynamic stock history display in chart

  const fetchStockHistory = async (symbol: string, range: string) => {
    if (!symbol) return;

    try {
      const res = await fetch("https://backend-code-production-77c7.up.railway.app/stock-analyzer/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, range }),
      });

      if (!res.ok) throw new Error("Backend not ready");
      
      const data = await res.json();

      // Expecting backend to return: [{ date: "2025-01-01", close: 150 }, ...]

      setStockData(data.history || []);
    } catch (err) {
      console.warn("Using fallback data because backend is not ready:", err);
    setStockData([
      { date: "2025-01-01", close: 150 },
      { date: "2025-02-01", close: 160 },
      { date: "2025-03-01", close: 170 },
      { date: "2025-04-01", close: 165 },
      { date: "2025-05-01", close: 180 },
    ]);
    
    }
  };

  return (
    <section className="mx-auto max-w-6xl bg-white text-gray-900 px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Stock Market Analyzer
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-64 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Analyze
        </button>
      </form>

      {submitted && (
        <div className="space-y-8">
          {/* Company Overview */}
          <div className="p-6 rounded-lg border bg-gray-50 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Company Overview</h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              {companySummary}
            </p>
          </div>

          {/* 👇 Stock Chart inserted here */}
          <div className="p-6 rounded-lg border bg-gray-50 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">Stock Price Chart</h2>

    {/* Dropdown */}
    <select
      className="border rounded px-2 py-1 text-sm"
      value={range}
      onChange={(e) => {
        setRange(e.target.value);
        fetchStockHistory(symbol, e.target.value);
      }}
    >
      <option value="1mo">1M</option>
      <option value="3mo">3M</option>
      <option value="6mo">6M</option>
      <option value="1y">1Y</option>
      <option value="5y">5Y</option>
    </select>
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={stockData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="close"
        stroke="#2563eb"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

          {/* 3 Columns of Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {/* Column 1 */}
            <div className="space-y-2">
              {column1.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b py-1"
                >
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              {column2.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b py-1"
                >
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Column 3: Analyst Ratings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Analyst Ratings</h3>
              {(() => {
                const colors: Record<string, string> = {
                  buy: "bg-green-500",
                  hold: "bg-yellow-500",
                  sell: "bg-red-500",
                };

                const ratings = analystRatings;
                const total =
                  Number(ratings?.buy || 0) +
                  Number(ratings?.hold || 0) +
                  Number(ratings?.sell || 0) || 1;

                return (Object.entries(ratings) as [keyof typeof ratings, number][])
                  .map(([label, value]) => {
                    const pct = Math.min(100, (Number(value) / total) * 100);
                    return (
                      <div key={label}>
                        <div className="flex justify-between mb-1">
                          <p className="capitalize text-gray-700 text-sm">{label}:</p>
                          <p className="text-sm font-medium">{value}</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden max-w-full">
                          <div
                            className={`${colors[label]} h-2`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  });
              })()}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 text-center mt-10">
            ⚠️ Disclaimer: This tool provides information for educational and
            research purposes only and does not constitute financial advice.
          </p>
        </div>
      )}
    </section>
  );
}