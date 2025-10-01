import Pichart from "../charts/pichart";
import SparkLine from "../charts/SparkLine"
import Stepper from "./stepper";
const charts = () => {
  return (  <div>
  {/* Floating Grid */}
  <div className="relative z-15 mt-32 px-6 md:px-16 lg:px-32">
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-10 
                 bg-gradient-to-br from-white/5 to-white/10
                 backdrop-blur-xl border border-cyan-400/20 
                 rounded-3xl shadow-[0_12px_60px_rgba(0,0,0,0.6)]
                 hover:shadow-[0_15px_80px_rgba(34,211,238,0.3)]
                 transition-all duration-300 p-10"
    >
      <SparkLine name="User Activity" number={123} data={[1, 8, 3, 4, 0]} />
      <SparkLine name="Conversion Rate" number={325} data={[1, 2, 1, 2, 0]} />
      <SparkLine name="Event Count" number={200} data={[2, 1, 0, 0, 1, 2, 1, 0, 0, 1]} />
    </div>
  </div>

      <div className="bg-black/55  grid grid-cols-1 md:grid-cols-2 gap-8  text-center  items-center min-h-screen px-16 " >

     <h1 className="md:text-5xl font-mono border-b-cyan-300 border-2 border-transparent text-2xl">how to use our app !</h1>
         <Stepper/>
    </div>


    </div>
  )
}

export default charts