import Hero from "@/app/Landing/page";
import { NavbarDemo } from "@/component/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <NavbarDemo />
      <Hero />
    </main>
  );
}
