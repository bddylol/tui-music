<script lang="ts">
	import { musicKitInstance } from '$lib/stores/musickit';
	import { onMount } from 'svelte';
	import { recentlyPlayed } from '$lib/stores/musickit';
	import { initializeMusicKit } from '$lib/musickit';

	onMount(async () => {
		await initializeMusicKit();
		const played = await $musicKitInstance.api.recentPlayed();
		recentlyPlayed.set(played);
		console.log('Recently played tracks fetched:', played);
	});

	function playSong(track) {
		if (!$musicKitInstance) {
			console.error('MusicKit instance is not initialized');
			return;
		}
		if (track.type === 'songs') {
			$musicKitInstance
				.setQueue({ song: track.id })
				.then(() => $musicKitInstance.play())
				.catch((error) => {
					console.error('Error playing song:', error);
				});
		} else if (track.type === 'playlists') {
			$musicKitInstance
				.setQueue({ playlist: track.id })
				.then(() => $musicKitInstance.play())
				.catch((error) => {
					console.error('Error playing playlist:', error);
				});
		} else {
			console.error('Unsupported track type:', track.type);
		}
	}
</script>

<div class="h-full w-full font-mono text-green-400">
	<h1 class="mb-6 text-2xl font-bold text-cyan-300 select-none sm:text-3xl">Recently Played</h1>
	<ul class="space-y-2">
		{#each $recentlyPlayed as track}
			<li
				on:click={() => playSong(track)}
				class="flex cursor-pointer items-center text-lg hover:bg-[var(--background2)] sm:text-xl"
			>
				<span class="mr-3 font-bold text-lime-400 select-none">▶</span>
				<span>
					{track.attributes?.name ?? 'Unknown Track'}
					<span class="mx-2 text-cyan-300">by</span>
					{track.attributes?.curatorName ?? 'Unknown Curator'}
				</span>
			</li>
		{/each}
	</ul>
</div>
