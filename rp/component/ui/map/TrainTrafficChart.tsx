"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const trafficData = [
  { time: "06:00", active: 50, delayed: 2, cancelled: 1 },
  { time: "09:00", active: 80, delayed: 5, cancelled: 2 },
  { time: "12:00", active: 95, delayed: 8, cancelled: 3 },
  { time: "15:00", active: 120, delayed: 15, cancelled: 5 },
  { time: "18:00", active: 100, delayed: 10, cancelled: 3 },
  { time: "21:00", active: 70, delayed: 6, cancelled: 2 },
];

const TrainTrafficChart = () => {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-700 shadow-2xl shadow-blue-500/10">
      <h2 className="text-xl font-bold mb-4 text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
        Train Traffic Over Time
      </h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9ca3af"
            tick={{ fill: '#d1d5db' }}
            axisLine={{ stroke: '#4b5563' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#d1d5db' }}
            axisLine={{ stroke: '#4b5563' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(31, 41, 55, 0.8)', 
              border: '1px solid #4b5563', 
              borderRadius: '0.5rem',
              backdropFilter: 'blur(10px)',
              color: 'white'
            }} 
            itemStyle={{ color: 'white' }}
          />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px', 
              color: '#d1d5db' 
            }}
          />
          <Line 
            type="monotone" 
            dataKey="active" 
            stroke="#0fce45" 
            strokeWidth={2}
            dot={{ fill: '#0fce45', r: 4, strokeWidth: 2, stroke: '#00000020' }}
            activeDot={{ r: 6, fill: '#0fce45', stroke: '#ffffff', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="delayed" 
            stroke="#ffaa00" 
            strokeWidth={2}
            dot={{ fill: '#ffaa00', r: 4, strokeWidth: 2, stroke: '#00000020' }}
            activeDot={{ r: 6, fill: '#ffaa00', stroke: '#ffffff', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="cancelled" 
            stroke="#ff3b5c" 
            strokeWidth={2}
            dot={{ fill: '#ff3b5c', r: 4, strokeWidth: 2, stroke: '#00000020' }}
            activeDot={{ r: 6, fill: '#ff3b5c', stroke: '#ffffff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Active Trains</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span>Delayed Trains</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
          <span>Cancelled Trains</span>
        </div>
      </div>
    </div>
  );
};

export default TrainTrafficChart;