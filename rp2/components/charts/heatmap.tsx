import * as React from 'react';
import Box from '@mui/material/Box';
import { Heatmap } from '@mui/x-charts-pro/Heatmap';

import { HeatmapValueType } from '@mui/x-charts-pro/models'
export const data: HeatmapValueType[] = [
  [0, 0, 10],
  [0, 1, 20],
  [0, 2, 40],
  [0, 3, 90],
  [0, 4, 70],
  [1, 0, 30],
  [1, 1, 50],
  [1, 2, 10],
  [1, 3, 70],
  [1, 4, 40],
  [2, 0, 50],
  [2, 1, 20],
  [2, 2, 90],
  [2, 3, 20],
  [2, 4, 70],
  [3, 0, 40],
  [3, 1, 50],
  [3, 2, 20],
  [3, 3, 70],
  [3, 4, 90],
];
export default function HeatmapLegend() {
  return (
    <div className='border p-5 rounded-lg border-cyan-300 backdrop-blur-3xl bg-emerald-950/10 '>
      <div>
        <h1 className=' font-light text-gray-400 mb-1'>User Demographics</h1>
      </div>
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Heatmap
      key="heatmap"
        xAxis={[{ data: [1, 2, 3, 4] }]}
        yAxis={[{ data: ['A', 'B', 'C', 'D', 'E'] }]}
        series={[{ data }]}
        height={300}
        hideLegend={false}
        slotProps={{
          legend: {
            direction: 'vertical',
            position: { vertical: 'middle' },
            sx: { height: 200 },
          },
        }}
      />
    </Box>
    </div>
  );
}
