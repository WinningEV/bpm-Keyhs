"use client";

import SongTable from "@/components/SongTable";
import { MOCK_TRACKS } from "@/lib/mock-data";

export default function Demo() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Demo Library</h1>
          <p className="text-gray-400 mt-1">
            {MOCK_TRACKS.length} songs — Top hits on Spotify
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium">
          Demo Mode
        </span>
      </div>

      <SongTable tracks={MOCK_TRACKS} loading={false} />
    </div>
  );
}
