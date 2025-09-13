import React, { useEffect, useRef, useState } from "react";

// Extend Window type to include initMap
declare global {
  interface Window {
    initMap: () => void;
  }
}

const API_KEY = "AIzaSyADBpvlRV2JA2IPGbgG-gKrQtJGtCft-3E";
const mapRef = useRef(null);


const Location = () => {
  return (
    <div>Location</div>
  )
}

export default Location
