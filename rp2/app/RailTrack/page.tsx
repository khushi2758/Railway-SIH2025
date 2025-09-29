"use client";
import React, { useState } from "react";
import { Card } from "@/components/track/Card";
import { Expand, LineChart, Settings, RefreshCw } from "lucide-react";
import DataTable from "@/components/track/Table";


import { motion, AnimatePresence } from "framer-motion";
import { data} from "@/data/data";


const RailTrackSystem = () => {
  const [showRecords, setShowRecords] = useState(false);



  return (
    <div className="mt-0 overflow-x-hidden relative min-h-screen bg-black/30">
     
      
    

      <div className="flex flex-col items-center py-10">
        <div className="max-w-[1300px] w-full px-6">
          <h1 className="text-center text-4xl font-extrabold text-cyan-200 mb-10 tracking-wide">
            RailTrack Health Monitor Dashboard
          </h1>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button className="px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
              <RefreshCw size={18} /> Refresh
            </button>
            <button className="px-3 py-2 bg-violet-600 text-white rounded-lg flex items-center gap-2 hover:bg-violet-500 transition">
              <Settings size={18} /> Settings
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showRecords ? (
              <motion.div
                key="records"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                {/* Data Table */}
                <div className="w-full bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6">
                  <DataTable />
                </div>

                {/* Back Button */}
                <button
                  className="mt-6 px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition"
                  onClick={() => setShowRecords(false)}
                >
                  Back to Dashboard
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Grid of Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                  {data.map((item, index) => (
                    <Card
                      key={index}
                      title={item.title}
                      persentage={item.persentage}
                    />
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    className="px-4 py-2 bg-violet-600 rounded-lg text-white hover:bg-violet-500 transition"
                    onClick={() => setShowRecords(true)}
                  >
                    Show Previous Records{" "}
                    <Expand className="inline ml-2 mb-1" size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RailTrackSystem;
