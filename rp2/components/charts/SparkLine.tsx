"use client";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
interface SparkLineProps{
 name: string,
number?: number;
data: number[];

}
const SparkLine: React.FC<SparkLineProps> = ({name, number,data}) => {
  return (
       <div className='border p-5 rounded-lg border-cyan-300 backdrop-blur-3xl bg-emerald-950/10 '>
      <div>
        <h1 className=' font-light text-gray-400 mb-1'>{name}</h1>
      </div>
      <div className='flex flex-row gap-2'>
        
        <div>
        <Stack
      width="100%"
      direction="row"
      sx={{
        // For the examples page
        ['@container (width < 600px)']: {
          flexWrap: 'wrap',
          maxWidth: '100%',
      
        },
      }}
      gap={1}
    >
      <div className='p-3 text-center  text-4xl font-extrabold  '>{number}k</div>
      <Box flexGrow={1}>
        
        <SparkLineChart data={data} height={90}  width={200}/>
      </Box>
     
    </Stack>
    </div>
    </div>
      </div>
  )
}

export default SparkLine