import { TrackWithFeatures } from "./spotify";

// Top 10 popular songs on Spotify (mock data with realistic BPM/key values)
export const MOCK_TRACKS: TrackWithFeatures[] = [
  {
    id: "1",
    name: "Blinding Lights",
    artists: [{ name: "The Weeknd" }],
    album: {
      name: "After Hours",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 171,
    key: 1,  // C#/Db
    mode: 1, // Major → 3B
  },
  {
    id: "2",
    name: "Shape of You",
    artists: [{ name: "Ed Sheeran" }],
    album: {
      name: "÷ (Divide)",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 96,
    key: 1,  // C#/Db
    mode: 0, // Minor → 12A
  },
  {
    id: "3",
    name: "Sunflower",
    artists: [{ name: "Post Malone" }, { name: "Swae Lee" }],
    album: {
      name: "Spider-Man: Into the Spider-Verse",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 90,
    key: 2,  // D
    mode: 1, // Major → 10B
  },
  {
    id: "4",
    name: "One Dance",
    artists: [{ name: "Drake" }, { name: "WizKid" }, { name: "Kyla" }],
    album: {
      name: "Views",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 104,
    key: 1,  // C#/Db
    mode: 0, // Minor → 12A
  },
  {
    id: "5",
    name: "Starboy",
    artists: [{ name: "The Weeknd" }, { name: "Daft Punk" }],
    album: {
      name: "Starboy",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 186,
    key: 5,  // F
    mode: 0, // Minor → 4A
  },
  {
    id: "6",
    name: "Closer",
    artists: [{ name: "The Chainsmokers" }, { name: "Halsey" }],
    album: {
      name: "Collage",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 95,
    key: 8,  // G#/Ab
    mode: 1, // Major → 4B
  },
  {
    id: "7",
    name: "Lucid Dreams",
    artists: [{ name: "Juice WRLD" }],
    album: {
      name: "Goodbye & Good Riddance",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 84,
    key: 5,  // F
    mode: 0, // Minor → 4A
  },
  {
    id: "8",
    name: "Someone You Loved",
    artists: [{ name: "Lewis Capaldi" }],
    album: {
      name: "Divinely Uninspired to a Hellish Extent",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 110,
    key: 0,  // C
    mode: 1, // Major → 8B
  },
  {
    id: "9",
    name: "Bohemian Rhapsody",
    artists: [{ name: "Queen" }],
    album: {
      name: "A Night at the Opera",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 72,
    key: 10, // A#/Bb
    mode: 1, // Major → 6B
  },
  {
    id: "10",
    name: "Dance Monkey",
    artists: [{ name: "Tones and I" }],
    album: {
      name: "The Kids Are Coming",
      images: [
        { url: "", width: 640, height: 640 },
        { url: "", width: 300, height: 300 },
        { url: "", width: 64, height: 64 },
      ],
    },
    bpm: 98,
    key: 6,  // F#/Gb
    mode: 0, // Minor → 11A
  },
];

export const MOCK_USER = {
  name: "Demo User",
  image: null,
};
