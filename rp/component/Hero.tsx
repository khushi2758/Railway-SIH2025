"use client";
import React, { useState, useRef } from "react";
import { NavbarDemo } from "./Navbar";
import { Card } from "./Card";
import { BoxesCore } from "./ui/background-boxes";
import { Expand } from "lucide-react";
import CustomizedDialogs from "./ui/Dialogbox";
import Structural from "./pages/Structural";
import Overlay from "../component/Overlay";
import DataTable from "./ui/Table";
//import CartModal from "./CartModel";
const Hero = () => {
  {
    /* Hehehehehee Make it Smooth */
  }
  const data = [
    { title: "Structural", persentage: 80 },
    { title: "Rail", persentage: 90 },
    { title: "Sleeper", persentage: 70 },
    { title: "Ballast", persentage: 95 },
    { title: "Environmental", persentage: 99 },
    { title: "Bridge", persentage: 88 },
    { title: "Switch", persentage: 76 },
    { title: "Signal", persentage: 85 },
    { title: "Track Bed", persentage: 92 },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="mt-5">
        {/* Background effect */}
        <div className="absolute flex h-screen w-full items-center bg-white dark:bg-black justify-center top-0 left-0">
          <BoxesCore />
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center 
            bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
          />
        </div>

        {/* Navbar */}
        <NavbarDemo />

        {/* Hero content */}
        <div className="flex justify-center relative my-20 text-amber-50 z-10">
          <div className="max-w-[95vw] w-full">
            <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 mb-6">
              RAILTRACK HEALTH MONITOR SYSTEM
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {isOpen ? (
                <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                  <div>
                    <DataTable />
                  </div>
                </Overlay>
              ) : (
                <div className="grid grid-cols-3 ">
                  {data.map((item, index) => (
                    <Card
                      key={index}
                      title={item.title}
                      persentage={item.persentage}
                    />
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-8">
                <div
                  className="relative rounded-2xl h-[250px] flex items-center justify-center 
      bg-gradient-to-br from-zinc-900/70 to-zinc-800/60 
      border border-cyan-400/20 backdrop-blur-md overflow-hidden
      shadow-[0_0_25px_rgba(34,211,238,0.12)] hover:shadow-[0_0_35px_rgba(34,211,238,0.3)] 
      transition duration-300"
                >
                  <p className="text-center font-light tracking-widest text-cyan-300 text-lg">
                    Type of Track <br /> Model Render <br />{" "}
                    {/* <------- Track Model Render */}
                    <span className="font-semibold text-cyan-400">
                      [Name of Type]
                    </span>
                  </p>
                </div>
                <div
                  className="relative rounded-full h-[150px] flex items-center justify-center 
      bg-gradient-to-r from-zinc-900/70 to-zinc-800/60 
      border border-violet-400/20 backdrop-blur-md overflow-hidden
      shadow-[0_0_25px_rgba(167,139,250,0.15)] hover:shadow-[0_0_35px_rgba(167,139,250,0.35)]
      transition duration-300"
                >
                  <p className="text-violet-300 font-medium tracking-wide text-lg">
                    Prev Record {/*<------- Track Model Render */}
                    <button
                      className="text-violet-400 hover:text-violet-200 font-semibold "
                      onClick={toggleOverlay}
                    >
                      <Expand className="inline-block ml-2 mb-1" size={18} />
                    </button>
                    {/*<CustomizedDialogs />*/}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
