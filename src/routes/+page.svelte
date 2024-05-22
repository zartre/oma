<script>
	import CounterItem from '$lib/CounterItem.svelte'
</script>

<header>
	<h1>Days since</h1>
</header>
<main>
	<CounterItem title="Visit grandma" sinceDate={new Date(2024, 0, 1)} />
	<CounterItem title="See Oum" sinceDate={new Date(2024, 0, 14)} />
</main>
<footer>
	<a class="button" href="/create">Add</a>
</footer>

<style>
	main {
		padding: 0 1rem;
	}
	footer {
		backdrop-filter: blur(15px);
		background-color: rgba(255, 255, 255, 0.2);
		bottom: 0;
		left: 0;
		padding: 1rem;
		position: fixed;
		right: 0;
		text-align: center;
		width: 100%;
	}

	@media (prefers-color-scheme: dark) {
		footer {
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
</style>
