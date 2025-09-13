"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BottomNav from "@/component/ui/buttomNav";

const Hero: React.FC = () => {
  return (
    <div className="absolute top-0 w-full min-h-screen bg-black text-white overflow-hidden">
      <Image
        src="/raill.jpg"
        alt="Rail Background"
        fill
        className="object-cover scale-x-[-1]"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/70 to-transparent" />
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-10 md:px-20 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-extrabold"
        >
          <div className="text-4xl md:text-6xl">Smart Scheduling,</div>
          <div className="text-3xl md:text-5xl">Smooth Journeys</div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-handlee text-lg md:text-xl mt-4 text-gray-300 max-w-xl"
        >
          Every time !
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
