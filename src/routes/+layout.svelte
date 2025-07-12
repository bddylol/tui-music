<script lang="ts">
	import Player from '$lib/components/Player.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { initializeMusicKit } from '$lib/musickit';
	import { isMusicKitAuthenticated } from '$lib/stores/musickit';
	import Header from '$lib/components/Header.svelte';
	import Box from '$lib/components/Box.svelte';

	onMount(() => {
		initializeMusicKit();
	});

	let { children } = $props();
</script>

{#if !$isMusicKitAuthenticated}
	<div
		class="absolute z-40 flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--background2)]/80"
	>
		<h1 class="text-3xl">Login Required</h1>
		<p>A popup has been opened, please login with your Apple Account.</p>
	</div>
{/if}

<div style="--box-border-color: var(--background1);" class="flex h-full w-full flex-col">
	<!-- {@render children()} -->
	<Header />
	<div class="-mt-3 flex flex-1 flex-row">
		<Sidebar />
		<Box class="flex-1 overflow-y-auto !p-8" box-="square">
			{@render children()}
		</Box>
	</div>
	<Player />
</div>
