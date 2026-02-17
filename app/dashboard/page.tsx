"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { TrackWithFeatures } from "@/lib/spotify";
import SongTable from "@/components/SongTable";

const PAGE_SIZE = 50;

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tracks, setTracks] = useState<TrackWithFeatures[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracks = useCallback(async (accessToken: string, pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/tracks?page=${pageNum}&pageSize=${PAGE_SIZE}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch tracks");
      const data = await res.json();
      setTracks(data.tracks);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (session?.accessToken) {
      fetchTracks(session.accessToken, page);
    }
  }, [session, status, page, router, fetchTracks]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Spotify-style gradient header */}
      <div className="bg-gradient-to-b from-purple-800 via-purple-900/60 to-gray-950 px-4 sm:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto flex items-end gap-6">
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-indigo-600 to-blue-300 rounded shadow-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="pb-2">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">Playlist</p>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-4">Liked Songs</h1>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              {session?.user?.image && (
                <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
              )}
              <span className="font-semibold text-white">{session?.user?.name}</span>
              {total > 0 && (
                <>
                  <span className="text-gray-500">&#8226;</span>
                  <span>{total} songs</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Song list */}
      <div className="bg-gradient-to-b from-gray-950/0 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
          {error && (
            <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <SongTable tracks={tracks} loading={loading} />

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Previous
              </button>
              <span className="text-sm text-gray-400 tabular-nums">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
