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

// Each Camelot number (1-12) maps to a hue on the color wheel (0-360)
// Evenly spaced: 1→0° (red), 2→30° (orange), 3→60° (yellow), etc.
const CAMELOT_HUES: Record<number, number> = {
  1: 0,     // Red
  2: 30,    // Orange
  3: 50,    // Gold/Yellow
  4: 80,    // Yellow-Green
  5: 120,   // Green
  6: 150,   // Teal-Green
  7: 175,   // Teal
  8: 195,   // Cyan
  9: 220,   // Blue
  10: 255,  // Indigo
  11: 280,  // Purple
  12: 315,  // Magenta/Pink
};

export function getCamelotKey(key: number, mode: number): string {
  return CAMELOT_MAP[`${key}-${mode}`] ?? "N/A";
}

/**
 * Generate an HSL color based on Camelot key (hue) and BPM (vibrancy).
 * - Camelot number (1-12) determines the hue position on the color wheel
 * - A (minor) vs B (major): minor is slightly deeper, major is slightly brighter
 * - BPM (typically 60-200) controls saturation and lightness:
 *   - Low BPM → muted, desaturated
 *   - High BPM → vibrant, saturated
 */
export function getCamelotHSL(
  camelotKey: string,
  bpm: number
): { hue: number; saturation: number; lightness: number; css: string } {
  const match = camelotKey.match(/^(\d+)([AB])$/);
  if (!match) return { hue: 0, saturation: 0, lightness: 30, css: "hsl(0, 0%, 30%)" };

  const num = parseInt(match[1]);
  const letter = match[2];
  const hue = CAMELOT_HUES[num] ?? 0;

  // Normalize BPM to 0-1 range (60-200 typical range)
  const bpmNorm = Math.max(0, Math.min(1, (bpm - 60) / 140));

  // Saturation: low BPM = 30%, high BPM = 95%
  const saturation = 30 + bpmNorm * 65;

  // Lightness: minor (A) is deeper (darker), major (B) is brighter
  // Also BPM affects it: low BPM = darker, high BPM = more vivid
  const baseLightness = letter === "A" ? 38 : 48;
  const lightness = baseLightness + bpmNorm * 15;

  return {
    hue,
    saturation,
    lightness,
    css: `hsl(${hue}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`,
  };
}

/**
 * Get a CSS string for the row accent glow based on key + BPM
 */
export function getTrackColor(key: number, mode: number, bpm: number): string {
  const camelotKey = getCamelotKey(key, mode);
  if (camelotKey === "N/A") return "transparent";
  return getCamelotHSL(camelotKey, bpm).css;
}
