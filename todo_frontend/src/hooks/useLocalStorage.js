/**
 * PUBLIC_INTERFACE
 * useLocalStorage is a React hook that syncs state to localStorage.
 * - key: localStorage key
 * - initialValue: default value when nothing stored yet
 * Returns [value, setValue] similar to useState.
 */
import { useEffect, useState, useRef } from "react";

export function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

// PUBLIC_INTERFACE
export function useLocalStorage(key, initialValue) {
  /**
   * This is a public function.
   */
  const initialized = useRef(false);
  const [value, setValue] = useState(() => {
    if (!isBrowser()) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isBrowser()) return;
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota or serialization errors
    }
  }, [key, value]);

  return [value, setValue];
}
