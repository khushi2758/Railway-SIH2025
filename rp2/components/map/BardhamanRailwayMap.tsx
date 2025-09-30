"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Station, Rail, getRandomColor, Marker, Popup, Polyline, useIcons } from "./railwayUtils";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });

export default function BardhamanRailwayMap() {
  const [stations, setStations] = useState<Station[]>([]);
  const [rails, setRails] = useState<Rail[]>([]);
  const [isClient, setIsClient] = useState(false);
  const icons = useIcons();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    async function fetchData() {
      const query = `
        [out:json][timeout:25];
        (
          node(around:20000,23.2557,87.8590)["railway"="station"];
          node(around:20000,23.2557,87.8590)["railway"="halt"];
          way(around:20000,23.2557,87.8590)["railway"="rail"];
        );
        out body; >; out skel qt;
      `;
      const resp = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body: query });
      const data = await resp.json();

      const nodes: any = {};
      data.elements.forEach((el: any) => {
        if (el.type === "node") nodes[el.id] = { lat: el.lat, lon: el.lon, tags: el.tags || {} };
      });

      const stationsData: Station[] = data.elements
        .filter((el: any) => el.type === "node" && ["station", "halt"].includes(el.tags?.railway))
        .map((s: any) => ({
          id: s.id,
          name: s.tags?.name || "Unnamed",
          type: s.tags?.railway === "halt" ? "halt" : (s.tags?.name?.toLowerCase().includes("junction") ? "junction" : "station"),
          lat: s.lat,
          lon: s.lon,
        }));

      const railsData: Rail[] = data.elements
        .filter((el: any) => el.type === "way" && el.tags?.railway === "rail")
        .map((w: any, i: number) => ({
          id: w.id,
          path: w.nodes.map((nid: number) => nodes[nid]).filter(Boolean).map((n: any) => [n.lat, n.lon]),
          color: getRandomColor(i),
        }));

      setStations(stationsData);
      setRails(railsData);
    }

    if (isClient) fetchData();
  }, [isClient]);

  if (!isClient) return <p>Loading map...</p>;

  return (
    <div className="w-full h-full"> {/* <------- Make it responsive to parent */}
      <MapContainer
        center={[23.24958, 87.86990]}
        zoom={13}
        style={{ height: "100%", width: "100%" }} // <-------- fill parent div
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stations.map(st => (
          <Marker key={st.id} position={[st.lat, st.lon]} icon={icons[st.type] || icons.station}>
            <Popup>
              <h3>{st.name}</h3>
              <p>Type: {st.type}</p>
              <p>{st.lat.toFixed(4)}, {st.lon.toFixed(4)}</p>
            </Popup>
          </Marker>
        ))}
        {rails.map(r => (
          <Polyline key={r.id} positions={r.path} color={r.color} weight={4} opacity={0.8}>
            <Popup>
              <h4>Track Segment</h4>
              <p>ID: {r.id}</p>
              <p>Length: {r.path.length} points</p>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}
