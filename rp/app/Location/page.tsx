"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr:  false,      // Set to false if you want to disable server-side rendering for this component
});

export default function LocationPage() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Map />
    </div>
  );
}