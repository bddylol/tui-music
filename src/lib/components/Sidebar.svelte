<script lang="ts">
	import { onMount } from 'svelte';
	import Box from './Box.svelte';
	import SidebarSection from './SidebarSection.svelte';
</script>

<Box class="h-full w-64 space-y-8 !p-8" box-="square">
	<SidebarSection title="Apple Music">
		<a href="#change-me-later">Home</a>
		<a href="#change-me-later">Radio</a>
	</SidebarSection>
	<SidebarSection title="Playlists">
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
		<a href="#change-me-later">Playlist</a>
	</SidebarSection>
</Box>
