"use client";
import React, { useState } from "react";

interface TrainTypeData {
  name: string;
  value: number;
  color: string;
}

const TrainTypePie = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const trainTypeData: TrainTypeData[] = [
    { name: "PASSENGER", value: 70, color: "#3a506b" },
    { name: "FREIGHT", value: 50, color: "#5c8001" },
    { name: "MIXED", value: 20, color: "#8d5b4c" },
  ];

  const total = trainTypeData.reduce((sum, item) => sum + item.value, 0);
  const radius = 80;
  const center = 100;
  const strokeWidth = 26;

  const calculatePath = (value: number, totalValue: number, index: number) => {
    const percentage = value / totalValue;
    const startAngle = index === 0 ? 0 : 
      trainTypeData.slice(0, index).reduce((sum, item) => sum + (item.value / totalValue) * 360, 0);
    const endAngle = startAngle + percentage * 360;

    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center + radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center + radius * Math.sin(endAngleRad);

    const largeArcFlag = percentage > 0.5 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <div className="p-5 rounded-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700 shadow-2xl">
      <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-3">
        <h2 className="text-lg font-bold text-gray-200 uppercase tracking-wider">Train Types</h2>
        <div className="text-xs text-gray-400 font-mono">Total: {total}</div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Pie Chart */}
        <div className="relative flex-shrink-0">
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {trainTypeData.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const isSelected = selectedIndex === index;
              return (
                <path
                  key={index}
                  d={calculatePath(item.value, total, index)}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  className="transition-all duration-200 cursor-pointer"
                  style={{
                    opacity: isSelected ? 1 : (hoveredIndex === null || isHovered ? 1 : 0.7),
                    filter: isHovered || isSelected ? `drop-shadow(0 0 6px ${item.color})` : "none",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                />
              );
            })}
            <circle cx="100" cy="100" r="60" fill="none" stroke="#2a2a2a" strokeWidth="1" />
          </svg>
          {/* Center text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-mono font-bold text-gray-200">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
      {hoveredIndex !== null && (
        <div className="fixed p-2 bg-gray-800 border border-gray-600 rounded text-xs text-white pointer-events-none shadow-lg z-10">
          <p className="font-bold">{trainTypeData[hoveredIndex].name}</p>
          <p>{trainTypeData[hoveredIndex].value} units</p>
          <p>{((trainTypeData[hoveredIndex].value / total) * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
};

export default TrainTypePie;
