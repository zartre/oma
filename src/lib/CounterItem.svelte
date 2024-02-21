<script lang="ts">
	export let title: string;
	export let sinceDate: Date;

	// Does this need to be reactive?
	$: daysSince = Math.floor((Date.now() - sinceDate.getTime()) / 86_400_000);
</script>

<div class="counter-item">
	<h4>{title}</h4>
	<p>{daysSince}</p>
</div>

<style>
	.counter-item {
		background-color: var(--color-surface);
		border-radius: var(--border-radius);
		margin-bottom: 0.5rem;
		padding: 1rem;
	}
	.counter-item h4 {
		margin: 0 0 0.5rem;
	}
	.counter-item p {
		font-size: 1.8rem;
		line-height: 1em;
		margin: 0;
		text-align: right;
	}
	.counter-item:last-of-type {
		margin-bottom: 6em;
	}
</style>
