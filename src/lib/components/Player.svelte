<script>
	import Badge from './Badge.svelte';
	import { musicKitInstance, nowPlaying, playbackState } from '$lib/stores/musickit'; // Import new store

	// Listen for playback state changes
	$musicKitInstance?.addEventListener('playbackStateDidChange', (event) => {
		console.log('Playback state changed:', event);
		const item = $musicKitInstance.player.nowPlayingItem;
		nowPlaying.set(item);
		playbackState.set($musicKitInstance.player.playbackState); // Update playbackState store
	});

	// Listen for now playing item changes (crucial for track info updates)
	$musicKitInstance?.addEventListener('nowPlayingItemDidChange', (event) => {
		console.log('Now playing item changed:', event);
		const item = $musicKitInstance.player.nowPlayingItem;
		nowPlaying.set(item); // Ensure this updates the store whenever the item changes
	});

	function play() {
		$musicKitInstance?.player.play();
	}
	function pause() {
		$musicKitInstance?.player.pause();
	}
	function next() {
		$musicKitInstance?.player.skipToNextItem();
	}
	function previous() {
		$musicKitInstance?.player.skipToPreviousItem();
	}
</script>

<div class="flex flex-row justify-between px-1.5 pb-2.5 text-lg select-none">
	<div class="flex flex-row items-center gap-2">
		<Badge is-="badge" variant-="blue">
			{$playbackState !== null ? ($playbackState === 1 ? 'PAUSED' : 'PLAYING') : '⏸️'}
		</Badge>
		<Badge is-="badge" variant-="background1">
			 {$nowPlaying?.artistName?.toUpperCase() || 'UNKNOWN ARTIST'}</Badge
		>
		<Badge is-="badge" variant-="background0">
			 {$nowPlaying?.title || 'Unknown Title'} from {$nowPlaying?.albumName ||
				'Unknown Album'}</Badge
		>
	</div>
	<!-- Playback controls -->
	<div class="mx-2 flex flex-row items-center gap-1">
		<Badge is-="badge" variant-="background1" on:click={previous} style="cursor:pointer;"></Badge>
		{#if $playbackState === 1}
			<Badge is-="badge" variant-="background1" on:click={play} style="cursor:pointer;"></Badge>
		{:else}
			<Badge is-="badge" variant-="background1" on:click={pause} style="cursor:pointer;"></Badge>
		{/if}
		<Badge is-="badge" variant-="background1" on:click={next} style="cursor:pointer;"></Badge>
	</div>
	<div class="flex flex-row items-center">
		<Badge is-="badge" variant-="background1"> 45</Badge>
		<Badge is-="badge" variant-="blue">null / 2:20</Badge>
	</div>
</div>
