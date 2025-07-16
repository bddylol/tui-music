import { writable } from 'svelte/store';

export const musicKitInstance = writable<MusicKit.MusicKitInstance | null>(null);
export const isMusicKitAuthenticated = writable(false);

export const playlists = writable<MusicKit.LibraryPlaylists[]>([]);
export const recentlyPlayed = writable<MusicKit.Resource[]>([]);
export const nowPlaying = writable<MusicKit.MediaItem | null>(null);
export const playbackState = writable<MusicKit.PlaybackStates | null>(null);

const initialVolume = (() => {
	if (typeof localStorage !== 'undefined') {
		const saved = localStorage.getItem('musicKitVolume');
		if (saved !== null) return parseFloat(saved);
	}
	return 0.5; // default volume
})();

export const volume = writable<number>(initialVolume);

volume.subscribe((value) => {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('musicKitVolume', value.toString());
	}
});
