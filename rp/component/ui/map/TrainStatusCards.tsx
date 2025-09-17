"use client";
import React from "react";

const TrainStatusCards = () => {
  const trainStatus = [
    { 
      label: "Active", 
      value: 120, 
      color: "#0fce45",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      )
    },
    { 
      label: "Delayed", 
      value: 15, 
      color: "#ffaa00",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      label: "Cancelled", 
      value: 5, 
      color: "#ff3b5c",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      label: "Maintenance", 
      value: 8, 
      color: "#9e9e9e",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      )
    },
    { 
      label: "New Today", 
      value: 12, 
      color: "#00a8ff",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full ">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 p-6 bg-gray-800/30 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-500/10 border border-gray-700">
          {trainStatus.map((stat, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center p-5 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              style={{ 
                boxShadow: `0 4px 20px 2px ${stat.color}15`,
              }}
            >
              {/* Animated background element */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundColor: stat.color }}
              />
              
              {/* Icon container with glow effect */}
              <div 
                className="p-3 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ 
                  backgroundColor: `${stat.color}15`,
                  boxShadow: `0 0 25px ${stat.color}30`
                }}
              >
                <div className="text-2xl" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              
              {/* Value with subtle glow */}
              <span 
                className="text-2xl font-bold mb-2 z-10"
                style={{ 
                  color: stat.color,
                  textShadow: `0 0 15px ${stat.color}40`
                }}
              >
                {stat.value}
              </span>
              
              {/* Subtle connecting line animation on hover */}
              <div className="absolute bottom-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-10 transition-all duration-500" />
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {trainStatus.map((stat, idx) => (
            <div key={idx} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ 
                  backgroundColor: stat.color,
                  boxShadow: `0 0 8px ${stat.color}`
                }}
              ></div>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainStatusCards;