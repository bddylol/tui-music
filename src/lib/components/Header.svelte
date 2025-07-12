<script>
	import Box from './Box.svelte';
</script>

<Box class="flex h-20 flex-row items-center justify-between !p-8 whitespace-nowrap" box-="square">
	<h2 class="text-xl">TUIMusic</h2>
	<input
		class="w-1/3 bg-[var(--background1)] px-2 py-1"
		placeholder=" Search songs, artists, etc."
	/>
</Box>
