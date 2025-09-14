
import About from "@/app/About/page";
import Hero from "@/app/Landing/page"; 
import { NavbarDemo } from "@/component/Navbar";
import BottomNav from "@/component/ui/buttomNav";

export default function Home() {
  return (
    <>
    <NavbarDemo />
    <main className="min-h-screen overflow-y-scroll">
      <Hero />
    </main>
    <BottomNav />
    <About />
    
    </>
  );
}