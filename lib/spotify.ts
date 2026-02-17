export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
}

export interface TrackWithFeatures extends SpotifyTrack {
  bpm: number;
  key: number;
  mode: number;
}

export async function getLikedSongs(
  accessToken: string,
  limit = 50,
  offset = 0
): Promise<{ items: SpotifyTrack[]; total: number }> {
  const res = await fetch(
    `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) {
    throw new Error(`Spotify API error: ${res.status}`);
  }

  const data = await res.json();
  return {
    items: data.items.map((item: { track: SpotifyTrack }) => item.track),
    total: data.total,
  };
}

export async function getAudioFeatures(
  accessToken: string,
  trackIds: string[]
): Promise<
  { id: string; tempo: number; key: number; mode: number }[]
> {
  // Spotify allows max 100 IDs per request
  const chunks: string[][] = [];
  for (let i = 0; i < trackIds.length; i += 100) {
    chunks.push(trackIds.slice(i, i + 100));
  }

  const results = await Promise.all(
    chunks.map(async (chunk) => {
      const res = await fetch(
        `https://api.spotify.com/v1/audio-features?ids=${chunk.join(",")}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!res.ok) {
        throw new Error(`Spotify API error: ${res.status}`);
      }
      const data = await res.json();
      return data.audio_features;
    })
  );

  return results.flat().filter(Boolean);
}

export async function getLikedSongsWithFeatures(
  accessToken: string,
  page = 0,
  pageSize = 50
): Promise<{ tracks: TrackWithFeatures[]; total: number }> {
  const { items, total } = await getLikedSongs(
    accessToken,
    pageSize,
    page * pageSize
  );

  const trackIds = items.map((t) => t.id);
  const features = await getAudioFeatures(accessToken, trackIds);

  const featuresMap = new Map(features.map((f) => [f.id, f]));

  const tracks: TrackWithFeatures[] = items.map((track) => {
    const f = featuresMap.get(track.id);
    return {
      ...track,
      bpm: f ? Math.round(f.tempo) : 0,
      key: f?.key ?? -1,
      mode: f?.mode ?? -1,
    };
  });

  return { tracks, total };
}
