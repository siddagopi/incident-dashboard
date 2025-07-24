// app/page.tsx
"use client";
import React, { useState } from "react";
import IncidentPlayer from "@/components/IncidentPlayer";
import IncidentList from "@/components/IncidentList";
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const [incidents, setIncidents] = useState<
    { id: number; thumbnailUrl: string; ts: string }[]
  >([]);

  const handleCapture = (img: string) => {
    setIncidents((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        thumbnailUrl: img,
        ts: new Date().toLocaleString(),
      },
    ]);
  };

  const handleResolve = (id: number) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar at the top */}
      <Navbar isLoggedIn={false} onLogout={() => {}} />

      {/* Main content below navbar */}
      <main className="flex flex-1 mt-0">
        {/* Left: Incident Player */}
        <div className="w-2/3 p-8 flex items-center justify-center bg-gray-900 border-r border-gray-800">
          <IncidentPlayer onCapture={handleCapture} />
        </div>

        {/* Right: Incident List */}
        <div className="w-1/3 p-8 border-l border-gray-800 overflow-y-auto max-h-screen bg-gray-950">
          <IncidentList incidents={incidents} onResolve={handleResolve} />
        </div>
      </main>
    </div>
  );
}
