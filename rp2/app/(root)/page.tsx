import React from 'react'
import Charts from '@/components/home/charts'
const Home = () => {
  return (
     <>
    <div className='flex   items-center  text-gray-400 flex-row gap-4 md:gap-10  sm:pl-6 pt-40 pb-44 pr-10'>
      <h1 className='relative z-4 flex flex-col justify-center   md:px-20 text-left'>
      <div className='text-4xl md:text-6xl font-extrabold font-mono text-shadow-amber-950  text-gray-400'>Welcome to <br /> Railway Asset <br /><p className='text-cyan-200'>Management System</p></div>
    
      <p className='text-md md:text-lg font-mono mt-2 text-gray-500'>Track, Maintain, and Optimize Your Railway <br/> Infrastructure with Ease</p>
     
      </h1>
      
   <div className=' rounded-xl border  border-cyan-400/40 shadow-lg shadow-cyan-500/20 bg-cyan-500/35 p-1 pr-44 pb-9'>
  
      <p className='text-md md:text-lg font-bold p-0  text-cyan-100'> Live </p>
      <p className='text-md md:text-3xl font-mono pt-6 text-3xl pr-10 text-cyan-50'>26 </p>
      <p className='text-md md:text-lg font-mono mt-2 text-gray-500'>Assigned</p>
      <p className='text-md md:text-3xl font-mono pt-6 text-3xl pr-10 text-cyan-50'>10 </p>
      <p className='text-md md:text-lg font-mono mt-2 text-gray-500'>Unassigned</p>
      </div>
         <div className=' rounded-xl border  border-cyan-400/40 shadow-lg shadow-cyan-500/20 bg-cyan-500/35 p-1 pr-44 pb-9'>
  
      <p className='text-md md:text-lg font-bold p-0  text-cyan-100'>today </p>
      <p className='text-md md:text-3xl font-mono pt-6 text-3xl pr-10 text-cyan-50'>9m </p>
      <p className='text-md md:text-lg font-mono mt-2 text-gray-500'>FRT</p>
      <p className='text-md md:text-lg font-mono mt-2 text-shadow-cyan-50'>11% vs yesterday</p>
      <p className='text-md md:text-3xl font-mono pt-6 text-3xl pr-10 text-cyan-50'>95% </p>
      <p className='text-md md:text-lg font-mono mt-2 text-gray-500'>Within SLP</p>
      </div>
      
      </div>
     <Charts/>
   </>
  )
}

export default Home

