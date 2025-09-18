
import About from "@/app/About/page";
import Hero from "@/app/Landing/page"; 
import { NavbarDemo } from "@/component/Navbar";
import BottomNav from "@/component/ui/buttomNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    <NavbarDemo />
    <main className="min-h-screen overflow-y-scroll">
      <Hero />
    </main>
    <BottomNav />
    <About />
    
    </>
  );
}