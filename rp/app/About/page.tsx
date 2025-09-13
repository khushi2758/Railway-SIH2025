"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <div className="absolute w-full min-h-screen bg-gradient-to-b from-blue-900 via-black to-black text-white overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-black/60 to-black/90" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-12"
        >
          About <span className="text-cyan-400">Us</span>
        </motion.h1>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-300">
              Smart Scheduling, Smooth Journeys
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              We are committed to making train journeys more reliable, efficient, 
              and passenger-friendly. With advanced scheduling systems, real-time 
              monitoring, and AI-driven optimization, our mission is to ensure 
              trains run <span className="text-green-400">on time, every time</span>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From safety and security to punctuality and comfort, 
              our services are designed to enhance the passenger experience 
              while keeping Indian Railways at the forefront of modernization.
            </p>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Image
              src="/raill.jpg"
              alt="About Us Train"
              width={500}
              height={350}
              className="rounded-2xl shadow-lg border border-cyan-500/30"
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          {[
            { value: "+100", label: "Trains Optimized" },
            { value: "+50K", label: "Happy Passengers" },
            { value: "+19", label: "Cities Connected" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.8 }}
              className="p-6 rounded-2xl border border-cyan-400/40 shadow-lg shadow-cyan-500/20"
            >
              <p className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]">
                {stat.value}
              </p>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
