"use client";

import { useState } from "react";
import { TrackWithFeatures } from "@/lib/spotify";
import CamelotBadge from "./CamelotBadge";

type SortField = "name" | "artist" | "bpm" | "key";
type SortDir = "asc" | "desc";

interface SongTableProps {
  tracks: TrackWithFeatures[];
  loading: boolean;
}

export default function SongTable({ tracks, loading }: SongTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = sortField
    ? [...tracks].sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        switch (sortField) {
          case "name":
            return dir * a.name.localeCompare(b.name);
          case "artist":
            return dir * a.artists[0].name.localeCompare(b.artists[0].name);
          case "bpm":
            return dir * (a.bpm - b.bpm);
          case "key":
            return dir * (a.key * 2 + a.mode - (b.key * 2 + b.mode));
          default:
            return 0;
        }
      })
    : tracks;

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <svg className="w-4 h-4 ml-1 inline-block text-green-400" fill="currentColor" viewBox="0 0 24 24">
        {sortDir === "asc" ? (
          <path d="M7 14l5-5 5 5H7z" />
        ) : (
          <path d="M7 10l5 5 5-5H7z" />
        )}
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="space-y-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-md">
            <div className="w-10 h-10 bg-gray-800 rounded animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2 min-w-0">
              <div className="w-3/4 h-4 bg-gray-800 rounded animate-pulse" />
              <div className="w-1/2 h-3 bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="w-10 h-4 bg-gray-800 rounded animate-pulse flex-shrink-0" />
            <div className="w-10 h-6 bg-gray-800 rounded-full animate-pulse flex-shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
        <p className="text-lg">Songs you like will appear here</p>
        <p className="text-sm mt-1">Save songs by tapping the heart icon.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header row - desktop */}
      <div className="hidden sm:grid grid-cols-[32px_2fr_1fr_1fr_64px_56px] gap-4 px-4 py-2 border-b border-gray-800 text-xs font-medium uppercase tracking-wider text-gray-400">
        <div className="text-center">#</div>
        <div
          className="cursor-pointer hover:text-white transition-colors flex items-center"
          onClick={() => handleSort("name")}
        >
          Title <SortIcon field="name" />
        </div>
        <div
          className="cursor-pointer hover:text-white transition-colors flex items-center"
          onClick={() => handleSort("artist")}
        >
          Artist <SortIcon field="artist" />
        </div>
        <div>Album</div>
        <div
          className="cursor-pointer hover:text-white transition-colors flex items-center justify-end"
          onClick={() => handleSort("bpm")}
        >
          BPM <SortIcon field="bpm" />
        </div>
        <div
          className="cursor-pointer hover:text-white transition-colors flex items-center justify-center"
          onClick={() => handleSort("key")}
        >
          Key <SortIcon field="key" />
        </div>
      </div>

      {/* Mobile sort controls */}
      <div className="flex sm:hidden items-center gap-2 px-3 py-2 overflow-x-auto border-b border-gray-800 text-xs">
        <span className="text-gray-500 flex-shrink-0">Sort:</span>
        {(["name", "artist", "bpm", "key"] as SortField[]).map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full transition-colors ${
              sortField === field
                ? "bg-white/20 text-white"
                : "bg-white/5 text-gray-400"
            }`}
          >
            {field === "name" ? "Title" : field === "artist" ? "Artist" : field.toUpperCase()}
            {sortField === field && (
              <span className="ml-1">{sortDir === "asc" ? "\u25B2" : "\u25BC"}</span>
            )}
          </button>
        ))}
      </div>

      {/* Track rows */}
      <div className="mt-1">
        {sorted.map((track, i) => {
          const isHovered = hoveredRow === track.id;
          const albumImg = track.album.images[2]?.url || track.album.images[0]?.url;

          return (
            <div
              key={track.id}
              onMouseEnter={() => setHoveredRow(track.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Desktop row */}
              <div className="hidden sm:grid grid-cols-[32px_2fr_1fr_1fr_64px_56px] gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition-colors items-center">
                <div className="text-center text-sm text-gray-400 tabular-nums">
                  {isHovered ? (
                    <svg className="w-4 h-4 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  {albumImg ? (
                    <img
                      src={albumImg}
                      alt={track.album.name}
                      className="w-10 h-10 rounded shadow-md flex-shrink-0"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded shadow-md flex-shrink-0 bg-gray-800 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-white text-[15px] truncate">{track.name}</div>
                  </div>
                </div>

                <div className="text-sm text-gray-400 truncate">
                  {track.artists.map((a) => a.name).join(", ")}
                </div>

                <div className="text-sm text-gray-400 truncate">
                  {track.album.name}
                </div>

                <div className="text-right text-sm font-mono tabular-nums text-gray-300">
                  {track.bpm || "\u2014"}
                </div>

                <div className="flex justify-center">
                  <CamelotBadge musicalKey={track.key} mode={track.mode} />
                </div>
              </div>

              {/* Mobile row */}
              <div className="flex sm:hidden items-center gap-3 px-3 py-2.5 active:bg-white/10 transition-colors">
                {albumImg ? (
                  <img
                    src={albumImg}
                    alt={track.album.name}
                    className="w-12 h-12 rounded shadow-md flex-shrink-0"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-12 h-12 rounded shadow-md flex-shrink-0 bg-gray-800 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="text-white text-[15px] truncate">{track.name}</div>
                  <div className="text-gray-400 text-sm truncate">
                    {track.artists.map((a) => a.name).join(", ")}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs font-mono tabular-nums text-gray-400">
                    {track.bpm} BPM
                  </span>
                  <CamelotBadge musicalKey={track.key} mode={track.mode} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
