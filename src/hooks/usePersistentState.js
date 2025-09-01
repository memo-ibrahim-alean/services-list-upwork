import { useEffect, useState, useRef } from "react";

/**
 * usePersistentState
 * Simple localStorage backed state with lazy read & JSON parse safety.
 */
export function usePersistentState(key, defaultValue) {
  const isFirst = useRef(true);
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch (_) {}
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {}
  }, [key, value]);

  return [value, setValue];
}