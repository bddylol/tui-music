import { writable } from 'svelte/store';

export const musicKitInstance = writable<MusicKit.MusicKitInstance | null>(null);
export const isMusicKitAuthenticated = writable(false);

export const playlists = writable<MusicKit.LibraryPlaylists[]>([]);
export const recentlyPlayed = writable<MusicKit.Resource[]>([]);
export const nowPlaying = writable<MusicKit.MediaItem | null>(null);
export const playbackState = writable<MusicKit.PlaybackStates | null>(null);
