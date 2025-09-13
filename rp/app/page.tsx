import Hero from "@/component/Hero";
//import { FloatingNav } from "@/component/ui/FloatingNav";
import { FaHome } from "react-icons/fa";
import {NavbarDemo} from "@/component/Navbar";

export default function Home() {
  return (
    <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
          {/* <FloatingNav
           navItems = {[
            { name: "Home", link: "/" , icon: <FaHome/> },
            
           ]}>
      <NavbarDemo />   */}   
      <Hero />
    
</div>
    </main>
  );
}
