"use client";
import Link from "next/link";
import Location from "./Location";
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
} from "../component/ui/navbar-menu";
import { useState, useEffect, ReactElement } from "react";


interface NavItem {
  name: string;
  link: string;
}

interface NavbarDemoProps {
  // Add any props if needed
}

export function NavbarDemo({}: NavbarDemoProps): ReactElement {
  const navItems: NavItem[] = [
    {
      name: "RailTrack System",
      link: "/railtrack",
    },
    {
      name: "Structural",
      link: "/Structural",
    },
    {
      name: "Rail",
      link: "/Rail",
    },
    {
      name: "Sleeper",
      link: "/Sleeper",
    },
    {
      name: "Ballast",
      link: "/Ballast",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  //const [click, setClick] = useState<ReactElement>();
  useEffect(() => {
    const updateTime = (): void => {
      const now = new Date().toLocaleString();
      setTime(now);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);


  function handlelocationClick(){
    //setClick(<Link href="/Location">Location</Link>);
  // setClick(<Location/>)
    console.log("Location Clicked");
  }

  const handleMobileMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = (): void => {
    setIsMobileMenuOpen(false);
  };


  return (
    <div className="sticky top-0 z-50 backdrop-blur-2xl">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="mr-20" />
          <div className="flex items-center gap-3 ml-14 text-stone-200">
           

         <span className="ml-20 text-black dark:text-white font-semibold racking-widest text-sm" >{time || "Loading..."}</span>
           <Link href="/Location"> <NavbarButton variant="primary" className="ml-14 font-semibold racking-widest  text-sm"  >LOCATION </NavbarButton></Link>
            

           
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={handleMobileMenuClose}
                className="relative text-neutral-600 dark:text-neutral-300 block py-2 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={handleMobileMenuClose}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={handleMobileMenuClose}
                variant="primary"
                className="w-full"
              >
                LOCATION
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}