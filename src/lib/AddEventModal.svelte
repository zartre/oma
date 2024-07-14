<script lang="ts">
	import { TrackedEvent } from '$lib/models/trackedEvent'
	import { persistentStore } from '$lib/persistence/persistence'
	import { addTrackedEvent } from '$lib/stores/trackedEventStore'
	import { createEventDispatcher } from 'svelte'
	import { quintOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	let eventTitle = ''
	let eventDate = ''

	const dispatch = createEventDispatcher()

	const dispatchClose = () => dispatch('close', true)

	const save = async () => {
		const d = new Date(eventDate)
		const ev = new TrackedEvent(eventTitle, d)
		try {
			await persistentStore.createEvent(ev)
			addTrackedEvent(ev)
			dispatchClose()
		} catch (err) {
			alert(`Cannot save: ${err}`)
		}
	}
</script>

<div class="modal" transition:fly={{ duration: 150, easing: quintOut, y: 250 }}>
	<header>
		<button class="text-button" on:click={dispatchClose}>Cancel</button>
		<h1>New</h1>
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
				bind:value={eventTitle}
			/>

			<label for="event-date">Last date</label>
			<input
				type="date"
				id="date"
				autocomplete="off"
				placeholder="Pick the last date"
				required
				bind:value={eventDate}
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
