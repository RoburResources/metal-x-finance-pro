// Runtime evidence store — holds uploaded image URLs in memory (per session).
// Keys are evidence filenames, values are uploaded URLs.
// Components import { useEvidenceStore } to read/write.

import { useState, useEffect } from "react";

// Module-level map so all components share the same state
const store = {};
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => fn({ ...store }));
}

export function setEvidenceUrl(filename, url) {
  store[filename] = url;
  notify();
}

export function getEvidenceUrl(filename) {
  return store[filename] || null;
}

export function useEvidenceStore() {
  const [snap, setSnap] = useState({ ...store });
  useEffect(() => {
    const handler = (s) => setSnap(s);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);
  return snap;
}