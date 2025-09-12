"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <Image
        src="/raill.jpg"
        alt="Rail Background"
        fill
        className="object-cover opacity-70"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />

      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
        >
          Smart Scheduling, Smooth Journeys
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-handlee text-lg md:text-xl mt-4 text-gray-300 max-w-xl"
        >
          On time, Every time !
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex gap-4 mt-8"
        >
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform">
            Contact Us
          </button>
          <button className="px-6 py-3 rounded-xl border border-cyan-400 font-semibold text-cyan-300 hover:bg-cyan-400/20 hover:scale-105 transition-transform">
            Our Services
          </button>
        </motion.div>
      </div>

      <div className="absolute right-6 top-1/3 flex flex-col gap-6 text-right">
        {[
          { value: "+100", label: "Train" },
          { value: "+50K", label: "Passenger" },
          { value: "+19", label: "City" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.3, duration: 0.7 }}
            className=" px-6 py-4 rounded-2xl border border-cyan-400/40 border-b-0 shadow-lg shadow-cyan-500/20"
          >
            <p className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
              {stat.value}
            </p>
            <p className="text-sm text-gray-300">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-500/20 to-transparent blur-2xl" />
    </div>
  );
};

export default Hero;
