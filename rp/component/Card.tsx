"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
 interface Data {
    title: string;
    persentage?: number;
     }


export const Card: React.FC<Data> = ({ title, persentage }) => {
  return (
    
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white w-25% dark:bg-zinc-900">
       
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          
{title}{" "}Component
        </p>

       
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>{persentage} % </span>
          
        </button>
      </BackgroundGradient>
    </div>
  );
}
