<script>
	import Badge from './Badge.svelte';
	import { musicKitInstance, nowPlaying, playbackState, volume } from '$lib/stores/musickit'; // Import new store
	import Popover from './Popover.svelte';

	// Listen for playback state changes
	$musicKitInstance?.addEventListener('playbackStateDidChange', (event) => {
		console.log('Playback state changed:', event);
		const item = $musicKitInstance.player.nowPlayingItem;
		nowPlaying.set(item);
		playbackState.set($musicKitInstance.player.playbackState); // Update playbackState store
		// Ensure volume is set after playback state changes
		$musicKitInstance.player.volume = $volume;
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

	// Sync volume with MusicKit player
	$: if ($musicKitInstance && typeof $volume === 'number') {
		console.log('Setting player volume:', $volume);
		$musicKitInstance.player.volume = $volume;
	}
	$: console.log('Current volume:', $volume);
</script>

<div class="flex flex-row justify-between bg-[var(--background0)] text-lg select-none">
	<div class="flex flex-row items-center">
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
		<Popover position-="top center" is-="popover">
			<summary class="cursor-pointer"
				><Badge is-="badge" variant-="background1"> {Math.round($volume * 100)}</Badge></summary
			>
			<div class="flex flex-row bg-[var(--background1)] p-1">
				<button
					on:click={() => volume.update((v) => Math.max(0, v - 0.05))}
					style="all: unset; cursor: pointer; display: inline-block;"
					aria-label="Decrease volume"
				>
					<Badge is-="badge" variant-="background0">-</Badge>
				</button>
				<button
					on:click={() => volume.update((v) => Math.min(1, v + 0.05))}
					style="all: unset; cursor: pointer; display: inline-block;"
					aria-label="Increase volume"
				>
					<Badge is-="badge" variant-="background0">+</Badge>
				</button>
			</div>
		</Popover>
		<Badge is-="badge" variant-="blue">null / 2:20</Badge>
	</div>
</div>
