<script>
	export let className = '';
</script>

<div class={`!p-8 ${className}`} {...$$restProps}>
	<slot />
</div>
