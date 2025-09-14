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

interface Station {
  id: number;
  name: string;
  type: "junction" | "station" | "halt";
  lat: number;
  lon: number;
}

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
           node(around:20000,23.2557,87.8590)["railway"="station"];
            node(around:20000,23.2557,87.8590)["railway"="halt"];
            way(around:20000,23.2557,87.8590)["railway"="rail"];
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
    const stationsData: Station[] = data.elements
  .filter(
    (el: any) =>
      el.type === "node" && ["station", "halt"].includes(el.tags?.railway)
  )
  .map((s: any) => {
    let type: "junction" | "station" | "halt" = "station";

    if (s.tags?.railway === "halt") {
      type = "halt";
    } else if (s.tags?.railway === "station" && s.tags?.station === "junction") {
      type = "junction";
    }

    return {
      id: s.id,
      name: s.tags?.name || "Unnamed Stop",
      type,
      lat: s.lat,
      lon: s.lon,
    };
  });


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
    <MapContainer center={[23.24958,87.86990]} zoom={13} style={{ height: "90vh", width: "100%" , color: "black" }}>
      
      
      <TileLayer


        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Stations */}
      {stations.map((st) => {
  let iconUrl = "";

  if (st.type === "halt") {
    iconUrl =
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png";
  } else if (st.type === "junction") {
    iconUrl =
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png";
  } else {
    iconUrl =
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png";
  }

  return (
    <Marker
      key={st.id}
      position={[st.lat, st.lon]}
      icon={
        new L.Icon({
          iconUrl,
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      }
    >
      <Popup>
        <b>{st.name}</b> <br />
        Type: {st.type}
      </Popup>
    </Marker>
  );
})}



      {/* Tracks */}
      {rails.map((r) => (
        <Polyline key={r.id} positions={r.path} color="green" weight={2} />
      ))}
    </MapContainer>
  );
}
