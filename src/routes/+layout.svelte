<script lang="ts">
	import Player from '$lib/components/Player.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<column self-="grow" style="--box-border-color: var(--background2);">
	<div class="flex h-screen flex-row gap-3">
		<div class="w-[20rem]" box-="round">
			<Sidebar />
		</div>
		<div class="flex w-full flex-col">
			<div class="flex flex-row" box-="round">
				<Player />
			</div>
			<div class="flex-1" box-="round">
				{@render children()}
			</div>
		</div>
	</div>
</column>
