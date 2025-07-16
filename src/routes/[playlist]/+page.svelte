<script lang="ts">
	import { initializeMusicKit } from '$lib/musickit';
	import { musicKitInstance } from '$lib/stores/musickit';
	import { onMount } from 'svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
	let playlist: any = null;

	onMount(async () => {
		console.log('onMount running');
		await initializeMusicKit();
		console.log('MusicKit initialized');
		if (!$musicKitInstance) {
			console.error('MusicKit instance is not initialized');
			return;
		}

		//@ts-expect-error it existss
		if (data.playlist) {
			console.log('Fetching playlist for', data.playlist);
			//@ts-expect-error it existss
			const fetchedPlaylist = await $musicKitInstance.api.playlist(data.playlist);
			console.log('Fetched playlist:', fetchedPlaylist);
			playlist = fetchedPlaylist; // assign fetched playlist
			playlist = { ...playlist }; // force Svelte reactivity
		} else {
			console.error('No playlist data provided');
		}
	});
</script>

<div class="main">
	{#if playlist === null}
		<h1>Loading playlist...</h1>
	{:else}
		<h1>{JSON.stringify(playlist)}</h1>
	{/if}
	<p>Terminal-styled Apple Music web client.</p>
</div>

<style>
	.main {
		width: 100%;
		height: 100%;
		padding: 6ch;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.main h1 {
		font-size: 2rem;
	}
</style>
