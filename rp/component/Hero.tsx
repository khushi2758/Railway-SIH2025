import React from 'react'
import { cn } from "@/lib/utils";
import { Spotlight } from './ui/Spotlight';
import { BoxesCore } from './ui/background-boxes';


const Hero = () => {

  return (
    <div className='pb-20 pt-36 '>
      <div>
             <Spotlight gradientFirst ="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 89%, 41%, 0.60) 80%, transparent 100%)" translateY={-200} width={800} height={800} duration={10} xOffset={200}/>
             <Spotlight gradientSecond ="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(240, 100%, 45%, 0.02) 80%, transparent 100%)" translateY={-100} width={600} height={600} duration={8} xOffset={150}/>
      </div>
      <div className="absolute flex h-screen w-full items-center  bg-white dark:bg-black  item-center justify-center top-0 left-0">
             <div
               className={cn(
                 "absolute inset-0",
                 "[background-size:40px_40px]",
                 "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                 "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
               )}
             />
             {/* Radial gradient for the container to give a faded look */}
             <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
              dark:bg-black"/>
      </div>

      <div className="flex justify-center relative my-20 text-amber-50 z-10">
        <BoxesCore/>
        </div>
       
        </div>

    

   
      
  
  
  )
}

export default Hero