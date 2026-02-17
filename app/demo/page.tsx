"use client";

import SongTable from "@/components/SongTable";
import { MOCK_TRACKS } from "@/lib/mock-data";

export default function Demo() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Spotify-style gradient header */}
      <div className="bg-gradient-to-b from-purple-800 via-purple-900/60 to-gray-950 px-4 sm:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
          {/* Liked Songs icon */}
          <div className="w-36 h-36 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-600 to-blue-300 rounded shadow-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-14 h-14 sm:w-20 sm:h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="pb-2 text-center sm:text-left">
            <p className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider mb-1 sm:mb-2">Playlist</p>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-2 sm:mb-4">Liked Songs</h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-300">
              <span className="font-semibold text-white">Demo User</span>
              <span className="text-gray-500">&#8226;</span>
              <span>{MOCK_TRACKS.length} songs</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                Demo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="bg-gradient-to-b from-gray-950/0 to-gray-950">
        <div className="max-w-7xl mx-auto px-2 sm:px-8 py-4 sm:py-6">
          <SongTable tracks={MOCK_TRACKS} loading={false} />
        </div>
      </div>
    </div>
  );
}
