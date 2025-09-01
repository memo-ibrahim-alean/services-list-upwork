import { useEffect, useState, useCallback } from "react";

/**
 * useGeolocation
 * status: 'idle' | 'prompt' | 'locating' | 'granted' | 'denied' | 'error'
 * result: { latitude, longitude, accuracy } or null
 */
export function useGeolocation(options = {}) {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setError(new Error("Geolocation unsupported"));
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setResult({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
        setStatus("granted");
      },
      (err) => {
        setError(err);
        setStatus(err.code === 1 ? "denied" : "error");
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 300000,
        ...options
      }
    );
  }, [options]);

  return { status, result, error, request };
}

/**
 * Rough coordinate → city mapping placeholder.
 * In real app you’d use a reverse geocoding API or more precise bounding boxes.
 */
export function approximateCity({ latitude, longitude }) {
  const boxes = [
    { id: "bogota", label: "Bogotá", lat: 4.65, lon: -74.09, r: 0.7 },
    { id: "medellin", label: "Medellín", lat: 6.25, lon: -75.57, r: 0.6 },
    { id: "cali", label: "Cali", lat: 3.44, lon: -76.52, r: 0.6 },
    { id: "barranquilla", label: "Barranquilla", lat: 10.98, lon: -74.80, r: 0.7 },
    { id: "cartagena", label: "Cartagena", lat: 10.40, lon: -75.50, r: 0.7 }
  ];
  let best = null;
  for (const b of boxes) {
    const d = Math.sqrt(
      Math.pow(latitude - b.lat, 2) + Math.pow(longitude - b.lon, 2)
    );
    if (d <= b.r && (!best || d < best.d)) {
      best = { ...b, d };
    }
  }
  return best ? best.id : null;
}