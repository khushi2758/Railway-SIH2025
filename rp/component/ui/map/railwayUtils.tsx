"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Icon, LatLngExpression } from "leaflet";

export const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
export const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);
export const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);

export interface Station {
  id: number;
  name: string;
  type: "junction" | "station" | "halt";
  lat: number;
  lon: number;
}

export type Rail = {
  id: number;
  path: [number, number][];
  color: string;
};

/**
 * Create a custom Leaflet Icon
 */
export const createCustomIcon = (color: string): Icon | undefined => {
  if (typeof window === "undefined") return undefined;
  const L = require("leaflet");
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

/**
 * Default icon set for stations
 */
export const useIcons = () => {
  return useMemo(() => {
    return {
      junction: createCustomIcon("red"),
      station: createCustomIcon("blue"),
      halt: createCustomIcon("yellow"),
    };
  }, []);
};

/**
 * Utility: get random color for rails
 */
export const getRandomColor = (index: number) => {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F033FF", "#FF33A1",
    "#33FFF6", "#FFD733", "#33FF96", "#8C33FF", "#FF8C33",
    "#33B5FF", "#FF3333", "#33FF33", "#5733FF", "#FF3361",
    "#33FFC8", "#FF33E9", "#B5FF33", "#FF6F33", "#33FF8C",
    "#FF33B5", "#33E9FF", "#FFC833", "#338CFF", "#FF338C",
  ];
  return colors[index % colors.length];
};

/**
 * Advance marker position along a path
 */
export const advanceMarker = (
  path: LatLngExpression[],
  step: number
): LatLngExpression => {
  if (path.length === 0) return [0, 0];
  return path[Math.min(step, path.length - 1)];
};
