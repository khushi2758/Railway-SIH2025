import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
];


const pichart = () => {
  return (
    <div className='border p-5 rounded-lg border-cyan-300 backdrop-blur-3xl bg-emerald-950/10 '>
      <div>
        <h1 className=' font-light text-gray-400 mb-1'>User Demographics</h1>
      </div>
    <Stack width="100%" height={300} direction="row">
            <PieChart
        series={[
          {
            startAngle: -90,
            endAngle: 90,
            paddingAngle: 5,
            innerRadius: '60%',
            outerRadius: '90%',
            data,
          },
        ]}
        hideLegend
        width={300}
      />
    </Stack>
    </div>
  )
}

export default pichart