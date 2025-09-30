"use client";
import TrainMap from "@/components/map/TrainMap";
import React from "react";

const Page = () => {
  // Sample data
  const todaySchedule = [
    { train: "Rajdhani Express", id: "12951", from: "NDLS", to: "BCT", dep: "16:30", arr: "08:45", status: "On Time", platform: "5" },
    { train: "Shatabdi Express", id: "12001", from: "NDLS", to: "CDG", dep: "17:20", arr: "22:35", status: "Delayed", platform: "3" },
    { train: "Duronto Express", id: "12259", from: "NDLS", to: "SBC", dep: "18:45", arr: "20:15", status: "On Time", platform: "7" },
    { train: "Vande Bharat", id: "22223", from: "NDLS", to: "VNS", dep: "19:30", arr: "06:15", status: "On Time", platform: "2" },
    { train: "Gatimaan Express", id: "12049", from: "NZM", to: "JHS", dep: "20:15", arr: "23:45", status: "Early", platform: "4" }
  ];

  const upcomingMaintenance = [
    { section: "Track A - Northern Line", duration: "4h", start: "00:00", date: "15 Dec", impact: "Low" },
    { section: "Signal System Upgrade", duration: "6h", start: "02:00", date: "16 Dec", impact: "Medium" },
    { section: "Platform 8 Renovation", duration: "8h", start: "22:00", date: "17 Dec", impact: "High" }
  ];

  const crewSchedule = [
    { name: "Team Alpha", shift: "06:00-14:00", trains: 8, status: "Active" },
    { name: "Team Beta", shift: "14:00-22:00", trains: 6, status: "Standby" },
    { name: "Team Gamma", shift: "22:00-06:00", trains: 4, status: "Resting" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white p-6 space-y-8">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Railway Scheduling Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Real-time schedule management and coordination</p>
        </div>
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
            Add Schedule
          </button>
          <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
            Bulk Update
          </button>
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-4 py-2 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* ===== KPI GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Scheduled Today", value: "342", change: "+12", color: "text-blue-400", trend: "up" },
          { label: "On Time", value: "94.2%", change: "+1.2%", color: "text-green-400", trend: "up" },
          { label: "Delayed", value: "18", change: "-3", color: "text-amber-400", trend: "down" },
          { label: "Platform Usage", value: "87%", change: "+2.1%", color: "text-cyan-400", trend: "up" },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-[#141a29] border border-gray-700 p-6 rounded-xl hover:border-cyan-500/30 transition-all duration-300"
          >
            <p className="text-sm text-gray-400 mb-2">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className={`text-sm mt-1 ${kpi.trend === "up" ? "text-green-400" : "text-amber-400"}`}>
              {kpi.change} from yesterday
            </p>
          </div>
        ))}
      </div>

      {/* ===== HIERARCHICAL GRID ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ==== MAIN OPS (Map + Schedule) ==== */}
        <div className="xl:col-span-2 space-y-6">
          {/* Network Map */}
          <div className="bg-[#141a29] border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Network Operations Map</h2>
            <div className="w-full h-96 bg-gradient-to-br from-[#0d1320] to-[#1a2335] rounded-lg border border-gray-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
              
              <TrainMap/>

            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-[#141a29] border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-cyan-300 mb-4">Today's Schedule</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700 text-left text-gray-400 text-sm">
                    <th className="p-3">Train</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Departure</th>
                    <th className="p-3">Arrival</th>
                    <th className="p-3">Platform</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todaySchedule.map((s, i) => (
                    <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                      <td className="p-3">
                        <p className="font-medium">{s.train}</p>
                        <p className="text-gray-400 text-xs">{s.id}</p>
                      </td>
                      <td className="p-3">{s.from} → {s.to}</td>
                      <td className="p-3 font-mono">{s.dep}</td>
                      <td className="p-3 font-mono">{s.arr}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">{s.platform}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${
                          s.status === "On Time" ? "bg-green-500/20 text-green-400" :
                          s.status === "Delayed" ? "bg-amber-500/20 text-amber-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ==== RIGHT SIDEBAR ==== */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-blue-300 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {["Create New Schedule", "Modify Existing", "Delay Management", "Platform Allocation"].map((a, i) => (
                <button key={i} className="w-full p-3 bg-gray-800/40 text-gray-300 rounded-lg border border-gray-600 hover:border-cyan-400/40 transition-colors text-left">
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-amber-300 mb-4">Upcoming Maintenance</h2>
            <div className="space-y-3">
              {upcomingMaintenance.map((m, i) => (
                <div key={i} className="p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{m.section}</p>
                    <span className={`px-2 py-1 rounded text-xs ${
                      m.impact === "High" ? "bg-red-500/20 text-red-400" :
                      m.impact === "Medium" ? "bg-amber-500/20 text-amber-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {m.impact}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{m.date} · {m.start} · {m.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Crew */}
          <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-green-300 mb-4">Crew Schedule</h2>
            {crewSchedule.map((c, i) => (
              <div key={i} className="p-3 bg-gray-800/30 rounded-lg border border-gray-600 mb-3">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{c.name}</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    c.status === "Active" ? "bg-green-500/20 text-green-400" :
                    c.status === "Standby" ? "bg-blue-500/20 text-blue-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Shift: {c.shift} · Trains: {c.trains}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==== BOTTOM PANELS ==== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Utilization */}
        <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-purple-300 mb-4">Platform Utilization</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
              <div key={p} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Platform {p}</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }}></div>
                </div>
                <span className="text-sm text-gray-400">{Math.floor(Math.random() * 40 + 60)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conflicts */}
        <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-red-300 mb-4">Schedule Conflicts</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-medium text-red-300 text-sm">Platform Overlap</p>
              <p className="text-xs text-gray-400">Platform 3 · 17:30-18:00</p>
              <p className="text-xs text-gray-500">Rajdhani & Shatabdi</p>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="font-medium text-amber-300 text-sm">Crew Availability</p>
              <p className="text-xs text-gray-400">Team Beta Overtime</p>
              <p className="text-xs text-gray-500">Next shift 14:00-22:00</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="font-medium text-blue-300 text-sm">Maintenance Window</p>
              <p className="text-xs text-gray-400">Track A peak hours conflict</p>
              <p className="text-xs text-gray-500">Suggest rescheduling to 02:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
