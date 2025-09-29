import Pichart from "./charts/pichart";
import SparkLine from "./charts/SparkLine"
import Barchart from "./charts/barchart";
import  Heatmap  from "./charts/heatmap";
const charts = () => {
  return (
    <div className='min-h-screen p-10 flex   items-center  text-gray-400 flex-row gap-4 md:gap-10  sm:items-start bg-cyan-950/50 rounded-xl '>
      <div className="flex flex-row gap-10 md:gap-5">
         <SparkLine name="User" number={123} data={[1,8,3,4,0]}  />
       <SparkLine name="Conversion" number={325} data={[1,2,1,2,0]}  />
        <SparkLine name="Event count" number={200} data={[2,1,0,0,1,2,1,0,0,1]} />
      </div>
      <div className="flex flex-col gap-10 md:gap-4 ">
       
        <Pichart />    
         <Barchart/> 
         {/*<Heatmap    
         />*/}
      </div>
    </div>
  )
}

export default charts