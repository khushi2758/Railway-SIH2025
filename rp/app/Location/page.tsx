"use client"
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

type Station = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

type Rail = {
  id: number;
  path: [number, number][];
};

export default function BardhamanRailwayMap() {
  const [stations, setStations] = useState<Station[]>([]);
  const [rails, setRails] = useState<Rail[]>([]);

  useEffect(() => {
    async function fetchRailwayData() {
      const query = `
        [out:json][timeout:25];
        (
          node["railway"="station"](23.1921,87.8113,23.2784,87.8989);
          way["railway"="rail"](23.1921,87.8113,23.2784,87.8989);
        );
        out body;
        >;
        out skel qt;
      `;

      const resp = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });

      const data = await resp.json();

      const nodes: { [key: number]: { lat: number; lon: number; tags: any } } = {};
      data.elements.forEach((el: any) => {
        if (el.type === "node") {
          nodes[el.id] = { lat: el.lat, lon: el.lon, tags: el.tags || {} };
        }
      });

      // Stations
      const stationsData = data.elements
        .filter((el:any) => el.type === "node" && el.tags?.railway === "station")
        .map((s : any) => ({
          id: s.id,
          name: s.tags?.name || "Unnamed Station",
          lat: s.lat,
          lon: s.lon,
        }));

      // Rails
      const railsData = data.elements
        .filter((el : any) => el.type === "way" && el.tags?.railway === "rail")
        .map((w:any) => ({
          id: w.id,
          path: w.nodes
            .map((nid :number) => nodes[nid])
            .filter(Boolean)
            .map((n:any) => [n.lat, n.lon]),
        }));

      setStations(stationsData);
      setRails(railsData);
    }

    fetchRailwayData();
  }, []);

  return (
    <MapContainer center={[23.24, 87.86]} zoom={100000} style={{ height: "90vh", width: "100%" , color: "black" }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Stations */}
      {stations.map((st) => (
        <Marker key={st.id} position={[st.lat, st.lon]}>
          <Popup>{st.name}</Popup>
        </Marker>
      ))}

      {/* Tracks */}
      {rails.map((r) => (
        <Polyline key={r.id} positions={r.path} color="blue" weight={1} />
      ))}
    </MapContainer>
  );
}
