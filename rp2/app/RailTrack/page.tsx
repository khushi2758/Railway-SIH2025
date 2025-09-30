"use client";
import React, { useState } from "react";
import { RefreshCw, Settings, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/track/Card";
import DataTable from "@/components/track/Table";

const RailTrackSystem = () => {
  const [showRecords, setShowRecords] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");

  const extendedData = [
    { title: "Track Geometry Alignment", percentage: "92%", status: "good", trend: "up" },
    { title: "Gauge Variance", percentage: "1.5 mm", status: "warning", trend: "stable" },
    { title: "Rail Surface Wear", percentage: "78%", status: "warning", trend: "down" },
    { title: "Corrosion Index", percentage: "Low", status: "good", trend: "stable" },
    { title: "Rust Spread", percentage: "12%", status: "good", trend: "up" },
    { title: "Ultrasonic Defects", percentage: "4", status: "critical", trend: "up" },
  ];

  const statusData = [
    { section: "Section A", status: "Optimal", length: "2.3km", lastInspection: "2 days ago" },
    { section: "Section B", status: "Warning", length: "1.8km", lastInspection: "5 days ago" },
    { section: "Section C", status: "Critical", length: "3.1km", lastInspection: "1 day ago" },
    { section: "Section D", status: "Optimal", length: "2.7km", lastInspection: "3 days ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good": return <CheckCircle size={16} className="text-green-400" />;
      case "warning": return <AlertTriangle size={16} className="text-yellow-400" />;
      case "critical": return <XCircle size={16} className="text-red-400" />;
      default: return <CheckCircle size={16} className="text-gray-400" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    return <TrendingUp size={16} className={trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-yellow-400"} />;
  };

  const corrosionData = [20, 59, 80, 91, 56, 65, 40, 45, 50, 55, 60, 65];
  const defectData = [12, 19, 8, 15, 12, 10, 14, 16, 12, 10, 8, 6];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const maxCorrosion = Math.max(...corrosionData);
  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 text-gray-100">
      <header className="w-full bg-neutral-900/80 backdrop-blur-sm px-6 py-4 flex justify-between items-center shadow-xl border-b border-neutral-700">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent tracking-wide">
            Railway Track Health Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">Real-time monitoring and analytics</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-neutral-800 rounded-lg flex items-center gap-2 hover:bg-neutral-700 transition-all duration-300 border border-neutral-700">
            <RefreshCw size={18} /> Refresh Data
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg flex items-center gap-2 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg">
            <Settings size={18} /> Settings
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        {showRecords ? (
          <div className="flex flex-col items-center">
            <div className="w-full bg-neutral-900/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-neutral-800">
              <h2 className="text-xl font-semibold text-cyan-300 mb-4">
                Previous Track Records
              </h2>
              <DataTable />
            </div>
            <button
              className="mt-6 px-6 py-3 bg-neutral-800 rounded-xl text-white hover:bg-neutral-700 transition-all duration-300 border border-neutral-700 shadow-lg"
              onClick={() => setShowRecords(false)}
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-2xl p-6 border border-cyan-800/30 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">Total Track Length</p>
                    <h3 className="text-2xl font-bold mt-2">342.6 km</h3>
                  </div>
                  <div className="bg-cyan-500/20 p-3 rounded-xl">
                    <TrendingUp size={24} className="text-cyan-400" />
                  </div>
                </div>
                <p className="text-green-400 text-sm mt-4 flex items-center gap-1">
                  <TrendingUp size={16} /> +2.3% from last month
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-2xl p-6 border border-emerald-800/30 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">Optimal Sections</p>
                    <h3 className="text-2xl font-bold mt-2">78%</h3>
                  </div>
                  <div className="bg-emerald-500/20 p-3 rounded-xl">
                    <CheckCircle size={24} className="text-emerald-400" />
                  </div>
                </div>
                <p className="text-green-400 text-sm mt-4 flex items-center gap-1">
                  <TrendingUp size={16} /> +5.1% improvement
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 rounded-2xl p-6 border border-yellow-800/30 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">Maintenance Needed</p>
                    <h3 className="text-2xl font-bold mt-2">14</h3>
                  </div>
                  <div className="bg-yellow-500/20 p-3 rounded-xl">
                    <AlertTriangle size={24} className="text-yellow-400" />
                  </div>
                </div>
                <p className="text-red-400 text-sm mt-4 flex items-center gap-1">
                  <TrendingUp size={16} /> +3 this week
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-900/40 to-rose-900/40 rounded-2xl p-6 border border-rose-800/30 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-sm">Critical Alerts</p>
                    <h3 className="text-2xl font-bold mt-2">3</h3>
                  </div>
                  <div className="bg-rose-500/20 p-3 rounded-xl">
                    <XCircle size={24} className="text-rose-400" />
                  </div>
                </div>
                <p className="text-rose-400 text-sm mt-4">Immediate attention required</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {extendedData.map((item, index) => (
                <div key={index} className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-4 border border-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-cyan-800/50">
                  <div className="flex justify-between items-start mb-2">
                    {getStatusIcon(item.status)}
                    {getTrendIcon(item.trend)}
                  </div>
                  <h3 className="text-sm font-medium text-gray-300 mb-1">{item.title}</h3>
                  <p className="text-2xl font-bold text-white">{item.percentage}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Risk Score */}
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col items-center justify-center">
                <h2 className="text-lg font-semibold mb-4 text-amber-300">
                  Track Risk Score
                </h2>
                <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                  <div className="absolute w-full h-full rounded-full border-[10px] border-neutral-800" />
                  <div className="absolute w-full h-full rounded-full border-[10px] border-transparent border-t-amber-400 border-r-amber-400 rotate-45" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                  <span className="text-3xl font-bold text-white">741</span>
                </div>
                <div className="bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium">
                  High Risk
                </div>
                <p className="mt-3 text-sm text-gray-400 text-center">Needs immediate inspection and maintenance</p>
              </div>

              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-800 col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-cyan-300">
                    Corrosion Trend Analysis
                  </h2>
                  <select 
                    className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
                <div className="w-full h-[300px] bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <div className="flex items-end justify-between h-full">
                   {corrosionData.map((value, index) => (
  <div key={index} className="flex flex-col items-center">
    <div 
      className="w-8 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:to-cyan-200"
   style={{
  height: `${(value / maxCorrosion) * 300}px`, // 300px matches the container height
  minHeight: "20px",
  maxHeight: "100px",
}}
    />
    <span className="text-xs text-gray-400 mt-2">{months[index]}</span>
    <span className="text-xs text-cyan-300 mt-1">{value}</span>
  </div>
))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-800">
                <h2 className="text-lg font-semibold mb-6 text-violet-300">
                  Defect Trend Over Time
                </h2>
                <div className="w-full h-[250px] bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <div className="flex items-end justify-between h-full">
                    {defectData.map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-6 bg-gradient-to-t from-violet-500 to-violet-300 rounded-t-lg transition-all duration-500 hover:from-violet-400 hover:to-violet-200"
                          style={{ height: `${(value / maxCorrosion) * 300}px`, minHeight: "20px" }}
                        />
                        <span className="text-xs text-gray-400 mt-2">{months[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-neutral-800">
                <h2 className="text-lg font-semibold mb-6 text-green-300">
                  Track Section Status
                </h2>
                <div className="space-y-4">
                  {statusData.map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl border border-neutral-700 hover:border-neutral-600 transition-all duration-300">
                      <div>
                        <h3 className="font-medium text-white">{section.section}</h3>
                        <p className="text-sm text-gray-400">{section.length} • {section.lastInspection}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        section.status === 'Optimal' ? 'bg-green-500/20 text-green-400' :
                        section.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {section.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-neutral-800">
              <h2 className="text-lg font-semibold mb-4 text-violet-300">
                Defect Summary
              </h2>
              <DataTable />
            </div>

            <div className="flex justify-center">
              <button
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl text-white hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                onClick={() => setShowRecords(true)}
              >
                Show Previous Records & Historical Data
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full bg-neutral-900/80 backdrop-blur-sm px-6 py-4 mt-12 border-t border-neutral-800">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm text-gray-400">
          <p>Railway Track Monitoring System v2.1</p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </footer>
    </div>
  );
};

export default RailTrackSystem;