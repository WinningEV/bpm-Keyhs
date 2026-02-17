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
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...tracks].sort((a, b) => {
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
  });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 text-gray-500">
      {sortField === field ? (sortDir === "asc" ? "\u25B2" : "\u25BC") : "\u25B4"}
    </span>
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-14 bg-gray-800/50 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No liked songs found. Like some songs on Spotify first!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
            <th className="px-4 py-3 w-12">#</th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-white transition-colors"
              onClick={() => handleSort("name")}
            >
              Title <SortIcon field="name" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-white transition-colors"
              onClick={() => handleSort("artist")}
            >
              Artist <SortIcon field="artist" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-right"
              onClick={() => handleSort("bpm")}
            >
              BPM <SortIcon field="bpm" />
            </th>
            <th
              className="px-4 py-3 cursor-pointer hover:text-white transition-colors text-center"
              onClick={() => handleSort("key")}
            >
              Key <SortIcon field="key" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((track, i) => (
            <tr
              key={track.id}
              className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
            >
              <td className="px-4 py-3 text-gray-500 text-sm">{i + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  {track.album.images[2] && (
                    <img
                      src={track.album.images[2].url}
                      alt={track.album.name}
                      className="w-10 h-10 rounded"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="min-w-0">
                    <div className="font-medium truncate">{track.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {track.album.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-300">
                {track.artists.map((a) => a.name).join(", ")}
              </td>
              <td className="px-4 py-3 text-right font-mono text-green-400">
                {track.bpm || "—"}
              </td>
              <td className="px-4 py-3 text-center">
                <CamelotBadge musicalKey={track.key} mode={track.mode} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
