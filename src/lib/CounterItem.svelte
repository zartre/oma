<script lang="ts">
	export let title: string;
	export let sinceDate: Date;

	// Does this need to be reactive?
	$: daysSince = Math.floor((Date.now() - sinceDate.getTime()) / 86_400_000);
</script>

<div class="counter-item">
	<h2>{title}</h2>
	<span>{daysSince}</span>
</div>

<style>
	.counter-item {
		margin-bottom: 1rem;
		padding: 0 1em;
	}
</style>
