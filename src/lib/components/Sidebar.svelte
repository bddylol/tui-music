<script>
	import { initializeMusicKit } from '$lib/musickit';
	import { musicKitInstance, recentlyPlayed } from '$lib/stores/musickit';
	import { onMount } from 'svelte';

	const list = [
		{
			name: 'home',
			icon: '',
			type: 'file',
			link: '/'
		},
		{
			name: 'playlists',
			icon: '',
			type: 'folder',
			children: [
				// { name: 'playlist1', icon: '', type: 'file' },
				// { name: 'playlist2', icon: '', type: 'file' }
			]
		}
	];

	onMount(async () => {
		await initializeMusicKit();
		if (!$musicKitInstance) {
			console.error('MusicKit instance is not initialized');
			return;
		}
		const played = await $musicKitInstance.api.recentPlayed();
		recentlyPlayed.set(played);

		if (played.length > 0) {
			list[1].children = played.map((track) => ({
				name: track.attributes?.name,
				icon: '',
				type: 'file',
				id: track.id
			}));
		} else {
			console.log('No recently played tracks found');
		}
		console.log('Recently played tracks fetched:', played);
	});
</script>

<div class="sidebar">
	<div class="header">
		<div class="header-text">tuimusic</div>
	</div>
	<div class="list">
		{#each list as item}
			<div class="list-item">
				<a href={item.link} class="item-content">
					<span class="icon">{item.icon}</span>
					<span class="name">{item.name}</span>
				</a>
				{#if item.children}
					<div class="children">
						{#each item.children as child}
							<a href={child.id} class="child-item">
								<span class="icon">{child.icon}</span>
								<span class="name">{child.name}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.sidebar {
		width: 30ch;
		background-color: var(--background0);
	}

	.header {
		display: flex;
		align-items: center;
		padding: 2ch;
		font-weight: bbold;
		font-size: 1.1em;
	}

	.header-text {
		color: var(--foreground1);
	}

	.list {
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		gap: 8px;
	}
	.list-item {
		display: flex;
		flex-direction: column;
		padding: 0px 0px;
		color: var(--foreground1);
	}

	.item-content {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 2px 10px;
	}
	.item-content:hover {
		background-color: var(--background1);
		cursor: pointer;
	}

	.children {
		display: flex;
		flex-direction: column;
		padding-left: 20px;
		gap: 4px;
		margin-top: 4px;
	}

	.child-item {
		display: flex;
		align-items: center;
		padding: 2px 10px;
		color: var(--foreground1);
	}
	.child-item:hover {
		background-color: var(--background1);
		cursor: pointer;
	}
	.icon {
		margin-right: 10px;
		font-size: 1.2em;
	}
	.name {
		flex-grow: 1;
	}
</style>
