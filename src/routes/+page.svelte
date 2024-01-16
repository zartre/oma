<script>
	import CounterItem from '$lib/CounterItem.svelte';
</script>

<header>
	<h1>Days since</h1>
</header>
<main>
	<CounterItem title="Visit grandma" sinceDate={new Date(2024, 0, 1)} />
	<CounterItem title="See Oum" sinceDate={new Date(2024, 0, 14)} />
</main>
<footer>
	<button>Add</button>
</footer>

<style>
	header {
		padding: 0 1rem;
	}
	footer {
		padding: 1rem;
	}
</style>
