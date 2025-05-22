import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  // Fetch data from backend
  const fetchAnalysis = async () => {
    if (!url) return;
    const response = await fetch(`http://127.0.0.1:8000/analyze?url=${encodeURIComponent(url)}`);
    const result = await response.json();
    setData(result);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Website Analysis Dashboard</h1>

      {/* User Input */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button onClick={fetchAnalysis} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Analyze</button>
      </div>

      {/* Data Display */}
      {data && (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Website</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">SEO Score</th>
                  <th className="border p-2">Overall Score</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="border p-2">{data["Website URL"]}</td>
                  <td className="border p-2">{data["Website Type"]}</td>
                  <td className="border p-2">{data["SEO Score (%)"]}</td>
                  <td className="border p-2 font-bold">{data["Overall Score (10)"]}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Charts */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Website Scores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[data]}>
                <XAxis dataKey="Website URL" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="SEO Score (%)" fill="#0088FE" />
                <Bar dataKey="Overall Score (10)" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* UI vs UX Pie Chart */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">UI vs UX Score</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "UI Score", value: data["UI Score (10)"] },
                    { name: "UX Score", value: data["UX Score (10)"] },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#0088FE" />
                  <Cell fill="#FFBB28" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Extracted Colors */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Extracted Colors</h2>
            <div className="flex space-x-2">
              {data["Extracted Colors"].split(", ").map((color, index) => (
                <div key={index} className="w-10 h-10 rounded" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
