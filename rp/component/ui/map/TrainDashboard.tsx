"use client";
import React from "react";
import TrainMap from "./TrainMap";
import TrainStatusCards from "./TrainStatusCards";
import TrainTrafficChart from "./TrainTrafficChart";
import TrainTypePie from "./TrainTypePie";
import { NavbarDemo } from "@/component/Navbar";
import { motion } from "framer-motion";
const TrainDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 md:p-6 space-y-6 md:space-y-8 overflow-hidden">
      <NavbarDemo />
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8 h-full">
        <div className="xl:col-span-3 flex flex-col gap-6 md:gap-8">
          {/* Status Cards */}
          <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-5 shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              System Status
            </h2>
            <TrainStatusCards />
          </div>
          
          {/* Train Type Distribution */}
          <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-5 shadow-2xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-all duration-300">
            <TrainTypePie />
          </div>
        </div>
        <div className="xl:col-span-6">
          <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-5 shadow-2xl shadow-cyan-500/5 hover:shadow-cyan-500/10 transition-all duration-300 h-full">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Network Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="text-xs px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/30 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                  Live Tracking
                </div>
                <button className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/30 hover:bg-gray-700/70 transition-colors">
                  Filters
                </button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-700/30 aspect-video">
              <TrainMap />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-center">
          {[
           
{ heading: "99%", descriptions: "Geographic Accuracy of Mapping Data" },
  { heading: "2000+ km", descriptions: "Rail Routes Visualized on Map" },
  { heading: "24/7", descriptions: "Live Map Tracking and Updates" },
  { heading: "Multi-Layer", descriptions: "Interactive Maps with Routes & Stations" },
          
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.8 }}
              className="p-6 rounded-2xl border border-cyan-200/40 shadow-md shadow-cyan-200/20"
            >
              <p className="text-3xl font-bold text-cyan-200/90 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
                {stat.heading}
              </p>
              <p className="text-gray-300 mt-2">{stat.descriptions}</p>
            </motion.div>
          ))}
        </div>
          </div>
        </div>
        <div className="xl:col-span-3">
          <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-5 shadow-2xl shadow-amber-500/5 hover:shadow-amber-500/10 transition-all duration-300 h-full">
            <h2 className="text-lg font-semibold mb-5 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
              Traffic Analytics
            </h2>
            <TrainTrafficChart />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/20">
                <p className="text-xs text-gray-400">Avg. Speed</p>
                <p className="text-xl font-semibold">87<sub className="text-xs text-gray-500">km/h</sub></p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/20">
                <p className="text-xs text-gray-400">On Time</p>
                <p className="text-xl font-semibold">92<sub className="text-xs text-gray-500">%</sub></p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/20">
                <p className="text-xs text-gray-400">Active</p>
                <p className="text-xl font-semibold">42<sub className="text-xs text-gray-500">trains</sub></p>
              </div>
              <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-700/20">
                <p className="text-xs text-gray-400">Incidents</p>
                <p className="text-xl font-semibold">2<sub className="text-xs text-gray-500">today</sub></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 p-5 shadow-2xl shadow-violet-500/5 hover:shadow-violet-500/10 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <button className="text-xs text-gray-400 hover:text-white transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/20">
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-green-400 mt-1 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Train #2345 departed</p>
                <p className="text-xs text-gray-400">Platform 3A • 2 min ago</p>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/20">
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-amber-400 mt-1 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Maintenance alert</p>
                <p className="text-xs text-gray-400">Section B2 • 12 min ago</p>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/20">
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-blue-400 mt-1 mr-3"></div>
              <div>
                <p className="text-sm font-medium">Schedule update</p>
                <p className="text-xs text-gray-400">Route 7 • 25 min ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainDashboard;