import Pichart from "../charts/pichart";
import SparkLine from "../charts/SparkLine"
import Stepper from "./stepper";
const charts = () => {
  return (  <div>
    <div className='  grid grid-cols-1 md:grid-cols-3  mt-16 text-center px-36  items-center  text-gray-400 flex-row gap-4 md:gap-10   bg-black/90   mask-radial-at-bottom-right p-6 pt-16 pb-16 border-y-2 border-cyan-400 w-full '>
     
         <SparkLine name="User" number={123} data={[1,8,3,4,0]}  />
       <SparkLine name="Conversion" number={325} data={[1,2,1,2,0]}  />
        <SparkLine name="Event count" number={200} data={[2,1,0,0,1,2,1,0,0,1]} />
         
     
    </div>
      <div className="bg-black/55  grid grid-cols-1 md:grid-cols-2 gap-8  text-center  items-center min-h-screen px-16 " >

     <h1 className="md:text-5xl font-mono border-b-cyan-300 border-2 border-transparent text-2xl">how to use our app !</h1>
         <Stepper/>
    </div>


    </div>
  )
}

export default charts