<script>
	export let className = '';
</script>

<div class={`${className}`} {...$$restProps}>
	<slot />
</div>
