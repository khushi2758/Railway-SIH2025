"use client";
import React from "react";
import { Brain, CalendarClock, ShieldCheck, Route } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav: React.FC = () => {
  const items = [
    { icon: Brain, label: "AI" },
    { icon: CalendarClock, label: "Scheduling" },
    { icon: ShieldCheck, label: "Safety" },
    { icon: Route, label: "Routing" },
  ];

  return (
    <div className="sticky z-20 flex justify-center -mt-28 -mb-8">
      <div className="w-[90%] md:w-[70%] bg-transparent backdrop-blur-2xl text-blue-100 border border-cyan-400/30 shadow-xl rounded-2xl px-6 py-4 flex items-center justify-around">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="flex flex-col items-center gap-1 cursor-pointer hover:scale-110 transition-transform"
          >
            <item.icon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.7)]" />
            <p className="text-sm font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
