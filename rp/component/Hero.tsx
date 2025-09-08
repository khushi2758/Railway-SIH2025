import React from "react";
import { NavbarDemo } from "./Navbar";
import { Card } from "./Card";
import { BoxesCore } from "./ui/background-boxes";

const Hero = () => {
  return (
    <>
      <div className="mt-5">
        <div className="absolute flex h-screen w-full items-center  bg-white dark:bg-black  item-center justify-center top-0 left-0">
          <BoxesCore />
          {/* Radial gradient for the container to give a faded look */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
              dark:bg-black"
          />
        </div>
        <NavbarDemo />
        <div className="flex justify-center relative my-20 text-amber-50 z-10">
          <div className="max-w-[89vw] flex flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
            <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 mb-6">
              RAILTRACK HEALTH MONITOR SYATEM
            </h2>
            <div className="flex flex-row-reverse gap-7  items-center justify-center-safe">
              <Card  title="Structural" persentage={80}/>
              <Card title= "Rail" persentage={90}/>
              <Card title="Sleeper" persentage={70}/>
              <Card title= "Ballast"persentage={95}/>
              <Card title="Environmental" persentage={99} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
