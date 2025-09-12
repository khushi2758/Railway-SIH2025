"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

interface Data {
  title: string;
  persentage?: number;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#788f8e",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

export const Card: React.FC<Data> = ({ title, persentage }) => {
  return (

    <BackgroundGradient className=" max-w-sm w-full sm:p-8 bg-white dark:bg-zinc-900 transition hover:scale-[1.02] 
    
      bg-gradient-to-br from-zinc-900/70 to-zinc-800/60 
      border border-cyan-400/20 backdrop-blur-md overflow-hidden
      shadow-[0_0_25px_rgba(34,211,238,0.12)] hover:shadow-[0_0_35px_rgba(34,211,238,0.3)] 
       duration-300
    ">
      
      {/* Title */}
      <p className="text-lg sm:text-xl font-light tracking-widest text-cyan-300 mb-6">
        {title}
      </p>

      {/* Progress Bar */} 
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <BorderLinearProgress variant="determinate" value={persentage} />
      </Stack>

      {/* Percentage Display */}
      <div className="flex justify-end mt-6">
        <button className="px-5 py-2 rounded-full 
    bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 
    border border-cyan-400/30 
    text-cyan-300 text-sm font-medium tracking-wide 
    shadow-[0_0_15px_rgba(34,211,238,0.25)] 
    hover:shadow-[0_0_25px_rgba(34,211,238,0.45)] 
    backdrop-blur-md transition duration-300" >
          {persentage}%
        </button>
      </div>
    </BackgroundGradient>
  );
};
