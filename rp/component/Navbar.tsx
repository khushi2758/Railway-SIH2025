"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/component/ui/navbar-menu";
import { useState,useEffect } from "react";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Structural",
      link: "#features",
    },
    {
      name: "Rail",
      link: "#pricing",
    },
    {
      name: "Sleeper",
      link: "#contact",
    },
     {
      name: "Ballast",
      link: "#features",
    },
    {
      name: "Environmental",
      link: "#pricing",
    },

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Set initial time when component mounts
    const updateTime = () => {
      const now = new Date().toLocaleString();
      setTime(now);
    };

    updateTime(); // call immediately

    // Optional: update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative  h-10 pb-2.5">
      <Navbar >
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="mr-20" />
          <div className="flex items-center gap-3 ml-14">
         <span className="ml-20 text-black dark:text-white font-semibold racking-widest text-sm" >{time || "Loading..."}</span>
            <NavbarButton variant="primary" className="ml-14 font-semibold racking-widest text-sm">LOCATION</NavbarButton>
            
            
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                LOCATION
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    

      {/* Navbar */}
    </div>
  );
}


