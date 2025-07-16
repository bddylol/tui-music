<script>
	export let className = '';
</script>

<details class={`${className}`} {...$$restProps}>
	<slot />
</details>
