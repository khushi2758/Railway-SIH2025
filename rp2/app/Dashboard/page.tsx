"use client";
import React from "react";

const Page = () => {
  // Schedule data
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
    <div className="min-h-screen bg-[#0a0f1c] text-white p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Railway Scheduling Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Real-time schedule management and coordination</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors">
              Add Schedule
            </button>
            <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
              Bulk Update
            </button>
          </div>
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-4 py-2 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Schedule KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: "Scheduled Today", 
            value: "342", 
            change: "+12",
            color: "text-blue-400",
            trend: "up"
          },
          { 
            label: "On Time", 
            value: "94.2%", 
            change: "+1.2%",
            color: "text-green-400",
            trend: "up"
          },
          { 
            label: "Delayed", 
            value: "18", 
            change: "-3",
            color: "text-amber-400",
            trend: "down"
          },
          { 
            label: "Platform Usage", 
            value: "87%", 
            change: "+2.1%",
            color: "text-cyan-400",
            trend: "up"
          },
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

      {/* Main Grid with Map */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Map */}
        <div className="xl:col-span-2 space-y-6">
          {/* Network Operations Map */}
          <div className="bg-[#141a29] border border-gray-700 rounded-xl">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-cyan-300">Network Operations Map</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm border border-cyan-500/30">
                    Live View
                  </button>
                  <button className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600">
                    Zones
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="w-full h-96 bg-gradient-to-br from-[#0d1320] to-[#1a2335] rounded-lg border border-gray-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
                
                {/* Simulated Map Content */}
                <div className="absolute inset-0 p-8">
                  {/* Major Routes */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1 border-b-2 border-dashed border-cyan-400"></div>
                  <div className="absolute top-1/2 left-1/4 w-1/2 h-1 border-b-2 border-dashed border-green-400"></div>
                  <div className="absolute top-3/4 left-1/4 w-1/2 h-1 border-b-2 border-dashed border-amber-400"></div>
                  
                  {/* Stations */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/4 left-3/4 w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-amber-400 rounded-full"></div>
                  
                  {/* Moving Trains */}
                  <div className="absolute top-1/4 left-2/4 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-red-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                </div>

                <div className="text-center relative z-10 bg-[#141a29]/80 p-6 rounded-lg border border-gray-600">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full"></div>
                  </div>
                  <p className="text-gray-300 text-lg">Live Railway Network</p>
                  <p className="text-gray-500 text-sm mt-2">Real-time train tracking across India</p>
                  
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="text-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-1"></div>
                      <p className="text-gray-400 text-xs">On Time</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-amber-400 rounded-full mx-auto mb-1"></div>
                      <p className="text-gray-400 text-xs">Delayed</p>
                    </div>
                    <div className="text-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mx-auto mb-1"></div>
                      <p className="text-gray-400 text-xs">Critical</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-[#141a29] border border-gray-700 rounded-xl">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-cyan-300">Today's Schedule</h2>
                <div className="flex space-x-2">
                  <select className="bg-[#0a0f1c] border border-gray-600 rounded-lg px-3 py-1 text-sm">
                    <option>All Stations</option>
                    <option>NDLS</option>
                    <option>BCT</option>
                    <option>CDG</option>
                  </select>
                  <input 
                    type="time" 
                    className="bg-[#0a0f1c] border border-gray-600 rounded-lg px-3 py-1 text-sm"
                    defaultValue="16:00"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-sm text-gray-400 font-medium">Train</th>
                    <th className="text-left p-4 text-sm text-gray-400 font-medium">Route</th>
                    <th className="text-left p-4 text-sm text-gray-400 font-medium">Departure</th>
                    <th className="text-left p-4 text-sm text-gray-400 font-medium">Arrival</th>
                    <th className="text-left p-4 text-sm text-gray-400 font-medium">Platform</th>
                    <th className="text-left p-4 text-sm text-gray-400 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todaySchedule.map((schedule, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{schedule.train}</p>
                          <p className="text-gray-400 text-sm">{schedule.id}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{schedule.from} → {schedule.to}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-mono">{schedule.dep}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-mono">{schedule.arr}</p>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                          {schedule.platform}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          schedule.status === "On Time" 
                            ? "bg-green-500/20 text-green-400" 
                            : schedule.status === "Delayed"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {schedule.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Quick Actions & Maintenance */}
        <div className="space-y-6">
          {/* Quick Schedule Actions */}
          <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-blue-300 mb-6">Schedule Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <span>Create New Schedule</span>
                  <span className="text-lg">+</span>
                </div>
              </button>
              <button className="w-full p-3 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <span>Modify Existing</span>
                  <span className="text-lg">↻</span>
                </div>
              </button>
              <button className="w-full p-3 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <span>Delay Management</span>
                  <span className="text-lg">⏱️</span>
                </div>
              </button>
              <button className="w-full p-3 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <span>Platform Allocation</span>
                  <span className="text-lg">📍</span>
                </div>
              </button>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-amber-300 mb-6">Upcoming Maintenance</h2>
            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance, index) => (
                <div key={index} className="p-3 bg-gray-800/30 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{maintenance.section}</p>
                    <span className={`px-2 py-1 rounded text-xs ${
                      maintenance.impact === "High" 
                        ? "bg-red-500/20 text-red-400"
                        : maintenance.impact === "Medium"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-green-500/20 text-green-400"
                    }`}>
                      {maintenance.impact}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-xs">
                    <span>{maintenance.date} at {maintenance.start}</span>
                    <span>{maintenance.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crew Scheduling */}
          <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
            <h2 className="text-lg font-semibold text-green-300 mb-6">Crew Schedule</h2>
            <div className="space-y-4">
              {crewSchedule.map((crew, index) => (
                <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-medium">{crew.name}</p>
                    <span className={`px-2 py-1 rounded text-xs ${
                      crew.status === "Active" 
                        ? "bg-green-500/20 text-green-400"
                        : crew.status === "Standby"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {crew.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Shift: {crew.shift}</span>
                    <span>Trains: {crew.trains}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid - Platform & Conflicts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Utilization */}
        <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-purple-300 mb-6">Platform Utilization</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(platform => (
              <div key={platform} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Platform {platform}</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-8 text-right">
                  {Math.floor(Math.random() * 40 + 60)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Conflicts */}
        <div className="bg-[#141a29] border border-gray-700 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-red-300 mb-6">Schedule Conflicts</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-medium text-red-300 text-sm">Platform Overlap</p>
              <p className="text-gray-400 text-xs mt-1">Platform 3 - 17:30-18:00</p>
              <p className="text-gray-500 text-xs mt-1">Rajdhani & Shatabdi Express</p>
            </div>
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="font-medium text-amber-300 text-sm">Crew Availability</p>
              <p className="text-gray-400 text-xs mt-1">Team Beta - Overtime limit</p>
              <p className="text-gray-500 text-xs mt-1">Next shift: 14:00-22:00</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="font-medium text-blue-300 text-sm">Maintenance Window</p>
              <p className="text-gray-400 text-xs mt-1">Track A - Conflict with peak hours</p>
              <p className="text-gray-500 text-xs mt-1">Consider rescheduling to 02:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;