"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import {
  Station,
  Rail,
  getRandomColor,
  Marker,
  Popup,
  Polyline,
  useIcons,
} from "./railwayUtils";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

interface RailwayMapProps {
  lat: number;
  lon: number;
  radius?: number;
  zoom?: number;
}

type StationType = "all" | "station" | "halt" | "junction";

export default function RailwayMap({
  lat,
  lon,
  radius = 20000,
  zoom = 13,
}: RailwayMapProps) {
  const [stations, setStations] = useState<Station[]>([]);
  const [rails, setRails] = useState<Rail[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [selectedStationType, setSelectedStationType] = useState<StationType>("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const icons = useIcons();
  const mapRef = useRef<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsClient(true), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent map from stealing focus
  useEffect(() => {
    if (!mapReady) return;

    const preventMapFocus = () => {
      const mapContainer = document.querySelector('.leaflet-container');
      if (mapContainer) {
        mapContainer.removeAttribute('tabindex');
        (mapContainer as HTMLElement).style.pointerEvents = 'auto';
      }
    };

    preventMapFocus();

    const handleMouseDown = (e: Event) => {
      e.stopPropagation();
    };

    const mapContainer = document.querySelector('.leaflet-container');
    if (mapContainer) {
      mapContainer.addEventListener('mousedown', handleMouseDown);
      return () => {
        mapContainer.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [mapReady]);

  const fetchData = async (currentLat: number, currentLon: number) => {
    setIsReloading(true);
    const query = `
      [out:json][timeout:25];
      (
        node(around:${radius},${currentLat},${currentLon})["railway"="station"];
        node(around:${radius},${currentLat},${currentLon})["railway"="halt"];
        way(around:${radius},${currentLat},${currentLon})["railway"="rail"];
      );
      out body; >; out skel qt;
    `;
    try {
      const resp = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });
      const data = await resp.json();

      const nodes: any = {};
      data.elements.forEach((el: any) => {
        if (el.type === "node")
          nodes[el.id] = { lat: el.lat, lon: el.lon, tags: el.tags || {} };
      });

      const stationsData: Station[] = data.elements
        .filter(
          (el: any) =>
            el.type === "node" && ["station", "halt"].includes(el.tags?.railway)
        )
        .map((s: any) => ({
          id: s.id,
          name: s.tags?.name || "Unnamed",
          type:
            s.tags?.railway === "halt"
              ? "halt"
              : s.tags?.name?.toLowerCase().includes("junction")
              ? "junction"
              : "station",
          lat: s.lat,
          lon: s.lon,
        }));

      const railsData: Rail[] = data.elements
        .filter((el: any) => el.type === "way" && el.tags?.railway === "rail")
        .map((w: any, i: number) => ({
          id: w.id,
          path: w.nodes
            .map((nid: number) => nodes[nid])
            .filter(Boolean)
            .map((n: any) => [n.lat, n.lon]),
          color: getRandomColor(i),
        }));

      setStations(stationsData);
      setRails(railsData);
    } catch (error) {
      console.error("Error fetching railway data:", error);
    } finally {
      setIsReloading(false);
    }
  };

  // Fetch data when component mounts or when lat/lon changes
  useEffect(() => {
    if (isClient) {
      fetchData(lat, lon);
    }
  }, [lat, lon, radius, isClient]);

  // Update map center when lat/lon changes
  useEffect(() => {
    if (mapRef.current && mapReady) {
      mapRef.current.setView([lat, lon], zoom);
    }
  }, [lat, lon, zoom, mapReady]);

  // Filter stations based on selected type
  const filteredStations = stations.filter(station => {
    if (selectedStationType === "all") return true;
    return station.type === selectedStationType;
  });

  // Get station counts for each type
  const stationCounts = {
    all: stations.length,
    station: stations.filter(s => s.type === "station").length,
    halt: stations.filter(s => s.type === "halt").length,
    junction: stations.filter(s => s.type === "junction").length,
  };

  const stationTypeLabels = {
    all: "All Stations",
    station: "Stations",
    halt: "Halts",
    junction: "Junctions",
  };

  const handleStationTypeSelect = (type: StationType) => {
    setSelectedStationType(type);
    setShowDropdown(false);
  };

  const handleReload = () => {
    fetchData(lat, lon);
  };

  // Fixed: Use ref callback to get map instance
  const handleMapRef = (map: any) => {
    mapRef.current = map;
  };

  // Fixed: whenReady without arguments
  const handleMapReady = () => {
    setMapReady(true);
  };

  if (!isClient) return <p>Loading map...</p>;

  return (
    <div className="w-full h-full relative">
      {/* Floating Filter Dropdown */}
      <div 
        ref={dropdownRef}
        className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 min-w-48"
      >
        {/* Dropdown Button */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            <span className="font-medium text-gray-700">
              {stationTypeLabels[selectedStationType]}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
            {(["all", "station", "halt", "junction"] as StationType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleStationTypeSelect(type)}
                className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-blue-50 transition-colors ${
                  selectedStationType === type ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Station Type Icons */}
                  {type === "station" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                  {type === "halt" && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                  {type === "junction" && (
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  )}
                  {type === "all" && (
                    <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  )}
                  <span>{stationTypeLabels[type]}</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {stationCounts[type]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reload Button */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={handleReload}
          disabled={isReloading}
          className="bg-white hover:bg-gray-50 disabled:bg-gray-100 rounded-lg shadow-lg border border-gray-200 p-3 transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed group"
          title="Reload map data"
        >
          <div className="flex items-center gap-2">
            {isReloading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            ) : (
              <svg 
                className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            )}
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 hidden sm:block">
              {isReloading ? "Reloading..." : "Reload"}
            </span>
          </div>
        </button>
      </div>

      {/* Loading Overlay */}
      {isReloading && (
        <div className="absolute inset-0 z-[999] bg-black bg-opacity-20 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg px-6 py-4 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700 font-medium">Loading railway data...</span>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="w-full h-full">
        <MapContainer
          center={[lat, lon]}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          whenReady={handleMapReady}
          ref={handleMapRef}
          className="leaflet-container-nofocus"
          keyboard={false}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Filtered Stations */}
          {filteredStations.map((st) => (
            <Marker
              key={st.id}
              position={[st.lat, st.lon]}
              icon={icons[st.type] || icons.station}
            >
              <Popup>
                <div className="min-w-40">
                  <h3 className="font-semibold text-gray-800">{st.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      st.type === "station" ? "bg-blue-500" :
                      st.type === "halt" ? "bg-green-500" :
                      "bg-purple-500"
                    }`}></div>
                    <span className="text-sm text-gray-600 capitalize">{st.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {st.lat.toFixed(4)}, {st.lon.toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Rails (always shown) */}
          {rails.map((r) => (
            <Polyline
              key={r.id}
              positions={r.path}
              color={r.color}
              weight={4}
              opacity={0.8}
            >
              <Popup>
                <h4 className="font-semibold">Track Segment</h4>
                <p>ID: {r.id}</p>
                <p>Length: {r.path.length} points</p>
              </Popup>
            </Polyline>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}