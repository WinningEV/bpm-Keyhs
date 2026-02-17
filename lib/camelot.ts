// Camelot wheel mapping from Spotify's key (0-11) and mode (0=minor, 1=major)
// to Camelot notation used by DJs for harmonic mixing

const CAMELOT_MAP: Record<string, string> = {
  // Major keys (mode=1) → B notation
  "0-1": "8B",   // C major
  "1-1": "3B",   // C#/Db major
  "2-1": "10B",  // D major
  "3-1": "5B",   // D#/Eb major
  "4-1": "12B",  // E major
  "5-1": "7B",   // F major
  "6-1": "2B",   // F#/Gb major
  "7-1": "9B",   // G major
  "8-1": "4B",   // G#/Ab major
  "9-1": "11B",  // A major
  "10-1": "6B",  // A#/Bb major
  "11-1": "1B",  // B major
  // Minor keys (mode=0) → A notation
  "0-0": "5A",   // C minor
  "1-0": "12A",  // C#/Db minor
  "2-0": "7A",   // D minor
  "3-0": "2A",   // D#/Eb minor
  "4-0": "9A",   // E minor
  "5-0": "4A",   // F minor
  "6-0": "11A",  // F#/Gb minor
  "7-0": "6A",   // G minor
  "8-0": "1A",   // G#/Ab minor
  "9-0": "8A",   // A minor
  "10-0": "3A",  // A#/Bb minor
  "11-0": "10A", // B minor
};

// Color mapping for Camelot keys (grouped by number for visual harmony)
const CAMELOT_COLORS: Record<string, string> = {
  "1A": "bg-rose-600",    "1B": "bg-rose-500",
  "2A": "bg-orange-600",  "2B": "bg-orange-500",
  "3A": "bg-amber-600",   "3B": "bg-amber-500",
  "4A": "bg-yellow-600",  "4B": "bg-yellow-500",
  "5A": "bg-lime-600",    "5B": "bg-lime-500",
  "6A": "bg-green-600",   "6B": "bg-green-500",
  "7A": "bg-emerald-600", "7B": "bg-emerald-500",
  "8A": "bg-teal-600",    "8B": "bg-teal-500",
  "9A": "bg-cyan-600",    "9B": "bg-cyan-500",
  "10A": "bg-blue-600",   "10B": "bg-blue-500",
  "11A": "bg-violet-600", "11B": "bg-violet-500",
  "12A": "bg-purple-600", "12B": "bg-purple-500",
};

export function getCamelotKey(key: number, mode: number): string {
  return CAMELOT_MAP[`${key}-${mode}`] ?? "N/A";
}

export function getCamelotColor(camelotKey: string): string {
  return CAMELOT_COLORS[camelotKey] ?? "bg-gray-500";
}
