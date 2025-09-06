// components/Clock.js
"use client";
import { useEffect, useState } from "react";

export default function Clock() {
  const [dateTime, setDateTime] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!hasMounted) return null;

  return (
    <p>{`${dateTime.toLocaleTimeString()} – ${dateTime.toLocaleDateString()}`}</p>
  );
}
