<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { eventToEdit } from './stores/trackedEventStore'

	$: d = $eventToEdit.date
	$: savedDate = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
		.getDate()
		.toString()
		.padStart(2, '0')}`

	const dispatch = createEventDispatcher()

	const dispatchClose = () => dispatch('close', true)

	const save = async () => {}
</script>

<div class="modal">
	<header>
		<button class="text-button" on:click={dispatchClose}>Cancel</button>
		<h1>Edit</h1>
	</header>

	<main>
		<form on:submit|preventDefault={save}>
			<label for="title">Title</label>
			<input
				type="text"
				id="title"
				autocomplete="off"
				placeholder="What to call this item?"
				required
				bind:value={$eventToEdit.title}
			/>

			<label for="event-date">Last date</label>
			<input
				type="date"
				id="date"
				autocomplete="off"
				placeholder="Pick the last date"
				required
				bind:value={savedDate}
			/>

			<div class="form-buttons">
				<button class="button">Add</button>
			</div>
		</form>
	</main>
</div>

<style>
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
