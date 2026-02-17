"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-bold text-white hover:text-green-400 transition-colors">
          BPM & Key Finder
        </Link>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-gray-400 hidden sm:inline">
                {session.user?.name}
              </span>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  width={32}
                  height={32}
                />
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("spotify")}
              className="bg-green-500 hover:bg-green-400 text-black font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm transition-colors"
            >
              Connect Spotify
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
