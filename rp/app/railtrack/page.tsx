"use client";
import React, { useState } from "react";
import { Card } from "@/component/Card";
import { Expand } from "lucide-react";
import DataTable from "@/component/ui/Table";
import { BoxesCore } from "@/component/ui/background-boxes";

const RailTrackSystem = () => {
  const [showRecords, setShowRecords] = useState(false);

  const data = [
    { title: "Structural", persentage: 80 },
    { title: "Rail", persentage: 90 },
    { title: "Sleeper", persentage: 70 },
    { title: "Ballast", persentage: 95 },
    { title: "Environmental", persentage: 99 },
    { title: "Bridge", persentage: 88 },
    { title: "Switch", persentage: 76 },
    { title: "Signal", persentage: 85 },
    { title: "Track Bed", persentage: 92 },
  ];

  return (
    <div className="mt-0 overflow-x-hidden relative">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center bg-white dark:bg-black overflow-y-hidden">
        <BoxesCore />
        <div
          className="pointer-events-none absolute inset-0 
            bg-white dark:bg-black 
            [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex flex-col items-center py-20">
        <div className="max-w-[1000px] w-full">
          <h1 className="text-center text-3xl font-bold text-cyan-500 mb-10">
            RailTrack Health Monitor System
          </h1>

          {/* Toggle View */}
          {showRecords ? (
            <div className="flex flex-col items-center">
              {/* DataTable */}
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
            </div>
          ) : (
            <>
              {/* Grid of cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {data.map((item, index) => (
                  <Card
                    key={index}
                    title={item.title}
                    persentage={item.persentage}
                  />
                ))}
              </div>

              {/* Show Previous Records Button */}
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-violet-600 rounded-lg text-white hover:bg-violet-500 transition"
                  onClick={() => setShowRecords(true)}
                >
                  Show Previous Records{" "}
                  <Expand className="inline ml-2 mb-1" size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RailTrackSystem;
