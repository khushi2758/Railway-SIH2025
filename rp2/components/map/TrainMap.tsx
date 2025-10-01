"use client";
import React, { useState, useRef, useEffect } from "react";
import RailwayMap from "./RailwayMap";

const LOCATION_DATABASE = {
  bardhaman: { lat: 23.2557, lon: 87.859, name: "Bardhaman" },
  kolkata: { lat: 22.5726, lon: 88.3639, name: "Kolkata" },
  delhi: { lat: 28.7041, lon: 77.1025, name: "Delhi" },
  mumbai: { lat: 19.0760, lon: 72.8777, name: "Mumbai" },
};

const TrainMap = () => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState<{ lat: number; lon: number; name: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Force focus whenever component updates
  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Try to focus every time user might want to type
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { // If typing a character
        focusInput();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus on mount
    focusInput();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedLocation = location.toLowerCase().trim();
    const foundLocation = Object.entries(LOCATION_DATABASE).find(
      ([key]) => key === normalizedLocation
    );
    
    if (foundLocation) {
      setQuery({ 
        lat: foundLocation[1].lat, 
        lon: foundLocation[1].lon, 
        name: foundLocation[1].name 
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4 bg-gray-900">
      {/* Search Bar with High Z-Index */}
      <div className="relative z-50"> {/* High z-index to stay above map */}
        <form 
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-[#0d1320] border border-gray-700 rounded-lg px-3 py-2 shadow-lg"
          onClick={() => inputRef.current?.focus()} // Focus on any click in form
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Click here and type to search..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow bg-transparent text-white outline-none placeholder-gray-400"
            autoFocus
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white"
          >
            Search
          </button>
        </form>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative z-10"> {/* Lower z-index */}
        {query ? (
          <RailwayMap lat={query.lat} lon={query.lon} zoom={12} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Enter location to load map
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainMap;