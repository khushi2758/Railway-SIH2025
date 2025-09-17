"use client";

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
  color: string;
};

interface ElementNode {
  id: number;
  type: "node";
  lat: number;
  lon: number;
  tags?: {
    [key: string]: string;
  };
}

interface ElementWay {
  id: number;
  type: "way";
  nodes: number[];
  tags?: {
    [key: string]: string;
  };
}

type Element = ElementNode | ElementWay;

interface OverpassResponse {
  elements: Element[];
}

export default function BardhamanRailwayMap() {
  const [stations, setStations] = useState<Station[]>([]);
  const [rails, setRails] = useState<Rail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomColor = (index: number) => {
    const colors = [
      "#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A1",
      "#33FFF6", "#FFD733", "#33FF96", "#8C33FF", "#FF8C33",
      "#33B5FF", "#FF3333", "#33FF33", "#5733FF", "#FF3361",
      "#33FFC8", "#FF33E9", "#B5FF33", "#FF6F33", "#33FF8C",
      "#FF33B5", "#33E9FF", "#FFC833", "#338CFF", "#FF338C",
      "#33FF57", "#FF5733", "#5733FF", "#33FFC8", "#FF33A1",
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    async function fetchRailwayData() {
      try {
        setIsLoading(true);
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

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        const data: OverpassResponse = await resp.json();

        const nodes: {
          [key: number]: { lat: number; lon: number; tags: { [key: string]: string } };
        } = {};

        data.elements.forEach((el: Element) => {
          if (el.type === "node") {
            nodes[el.id] = { lat: el.lat, lon: el.lon, tags: el.tags || {} };
          }
        });

        const stationsData: Station[] = data.elements
          .filter(
            (el): el is ElementNode =>
              el.type === "node" && ["station", "halt"].includes(el.tags?.railway || "")
          )
          .map((s: ElementNode) => {
            const name = s.tags?.name || "Unnamed Stop";
            const lowerName = name.toLowerCase();

            if (lowerName.includes("junction")) {
              return {
                id: s.id,
                name,
                type: "junction",
                lat: s.lat,
                lon: s.lon,
              };
            } else if (lowerName.includes("halt")) {
              return {
                id: s.id,
                name,
                type: "halt",
                lat: s.lat,
                lon: s.lon,
              };
            } else if (s.tags?.railway === "halt") {
              return {
                id: s.id,
                name,
                type: "halt",
                lat: s.lat,
                lon: s.lon,
              };
            } else {
              return {
                id: s.id,
                name,
                type: "station",
                lat: s.lat,
                lon: s.lon,
              };
            }
          });

        const railsData: Rail[] = data.elements
          .filter((el): el is ElementWay =>
            el.type === "way" && el.tags?.railway === "rail"
          )
          .map((w: ElementWay, index: number) => ({
            id: w.id,
            path: w.nodes
              .map((nid: number) => nodes[nid])
              .filter((n): n is { lat: number; lon: number; tags: { [key: string]: string } } => Boolean(n))
              .map((n) => [n.lat, n.lon]),
            color: getRandomColor(index),
          }));

        setStations(stationsData);
        setRails(railsData);
        setError(null);
      } catch (err: unknown) {
        console.error("Failed to fetch railway data:", err);
        setError("Failed to load railway data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRailwayData();
  }, []);

  const createCustomIcon = (color: string) => {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  const junctionIcon = createCustomIcon("red");
  const stationIcon = createCustomIcon("blue");
  const haltIcon = createCustomIcon("yellow");

  const getIconForStation = (type: "junction" | "station" | "halt") => {
    switch (type) {
      case "junction":
        return junctionIcon;
      case "station":
        return stationIcon;
      case "halt":
        return haltIcon;
      default:
        return stationIcon;
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
            marginBottom: "16px",
          }}
        ></div>
        <p style={{ margin: 0, color: "#2c3e50", fontSize: "18px" }}>Loading railway data...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2 style={{ color: "#e74c3c" }}>Error</h2>
        <p style={{ color: "#2c3e50", marginBottom: "20px" }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <MapContainer
        center={[23.24958, 87.8699]}
        zoom={13}
        style={{ height: "80vh", width: "100%", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Stations */}
        {stations.map((st) => (
          <Marker key={st.id} position={[st.lat, st.lon]} icon={getIconForStation(st.type)}>
            <Popup>
              <div style={{ padding: "8px", minWidth: "200px" }}>
                <h3 style={{ margin: "0 0 8px 0", color: "#2c3e50", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>{st.name}</h3>
                <p style={{ margin: "4px 0" }}>
                  Type:{" "}
                  <span style={{
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    backgroundColor: st.type === "junction" ? "#ffebee" : st.type === "station" ? "#e3f2fd" : "#fff8e1",
                    color: st.type === "junction" ? "#c62828" : st.type === "station" ? "#1565c0" : "#f57f17"
                  }}>
                    {st.type}
                  </span>
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
                  Coordinates: {st.lat.toFixed(4)}, {st.lon.toFixed(4)}
                </p>
                {st.type === "junction" && (
                  <p style={{ margin: "8px 0 0 0", padding: "8px", backgroundColor: "#ffebee", borderRadius: "4px", fontSize: "14px", color: "#c62828" }}>
                    This station is detected as a junction because its name contains &quot;Junction&quot;.
                  </p>
                )}
                {st.type === "halt" && (
                  <p style={{ margin: "8px 0 0 0", padding: "8px", backgroundColor: "#fff8e1", borderRadius: "4px", fontSize: "14px", color: "#f57f17" }}>
                    This station is detected as a halt because its name contains &quot;Halt&quot; or has railway=halt tag.
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Rails */}
        {rails.map((r) => (
          <Polyline key={r.id} positions={r.path} color={r.color} weight={4} opacity={0.8}>
            <Popup>
              <div style={{ padding: "8px" }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#2c3e50" }}>Track Segment</h4>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  ID: {r.id}
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  Length: {r.path.length} points
                </p>
                <div style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  backgroundColor: r.color,
                  borderRadius: "4px",
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "8px"
                }}>
                  Track Color
                </div>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}
