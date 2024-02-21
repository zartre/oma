<script>
	import CounterItem from '$lib/CounterItem.svelte';

	const goBack = () => {
		window.history.back();
	};
</script>

<header>
	<button class="text-button" on:click={goBack}>Back</button>
	<h1>New</h1>
</header>
<main>
	<form action="/">
		<label for="event-name">Name</label>
		<input type="text" name="event-name" placeholder="Item name here" />
		<label for="event-date">Last date</label>
		<input type="date" name="event-date" placeholder="Pick the last date" />
		<div class="form-buttons">
			<button class="button">Add</button>
		</div>
	</form>
</main>

<style>
	header {
		padding: 30px 1em 0;
	}
	main {
		padding: 0 1em;
	}
	main input {
		width: 100%;
	}
	main input:last-of-type {
		margin-bottom: 0.4em;
	}
	.form-buttons {
		padding: 1em 0;
	}
</style>
