<script>
	export let title;
</script>

<details open data-sidebar-section>
	<summary>
		<h4 class="text-lg font-semibold">{title}</h4>
	</summary>
	<ul class="flex flex-col gap-2">
		<slot />
	</ul>
</details>
