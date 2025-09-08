"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';
import { IconAppWindow } from "@tabler/icons-react";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
 interface Data {
    title: string;
    persentage?: number;
     }

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#788f8e',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

export const Card: React.FC<Data> = ({ title, persentage }) => {
  return (
    
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white w-25% dark:bg-zinc-900">
       
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          
{title}{" "}Component
        </p>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
 
      <br />
      <BorderLinearProgress variant="determinate" value={persentage} />
    </Stack>
       
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>{persentage} % </span>
          
        </button>
      </BackgroundGradient>
    </div>
  );
}
