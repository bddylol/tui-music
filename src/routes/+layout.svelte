<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import { initializeMusicKit } from '$lib/musickit';
	import { isMusicKitAuthenticated } from '$lib/stores/musickit';
	import Player from '$lib/components/Player.svelte';

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
	<!-- TODO: put the top header in  -->
	<div class="flex h-full w-full flex-row">
		<Sidebar />
		<div class="flex-1 bg-[var(--background1)]">
			{@render children()}
		</div>
	</div>
	<Player />
</div>
