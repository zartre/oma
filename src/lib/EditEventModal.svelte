<script lang="ts">
	import { dateToSqlString } from '$lib/formatter'
	import { TrackedEvent } from '$lib/models/trackedEvent'
	import { persistentStore } from '$lib/persistence/persistence'
	import {
		deleteTrackedEvent,
		eventToEdit,
		updateTrackedEvent
	} from '$lib/stores/trackedEventStore'
	import { createEventDispatcher } from 'svelte'
	import { quintOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	// Date input binding based on this example
	// https://svelte.dev/repl/dc963bbead384b69aad17824149d6d27?version=3.25.1

	let rawDateInput: string = dateToSqlString($eventToEdit.date)
	/**
	 * Update the date object when the input changes
	 */
	const forOutput = (x: string) => ($eventToEdit.date = new Date(x))

	$: forOutput(rawDateInput)

	const dispatch = createEventDispatcher()

	const dispatchClose = () => dispatch('close', true)

	const resetDate = () => (rawDateInput = dateToSqlString(new Date()))
	const save = async () => {
		const ev = new TrackedEvent($eventToEdit.title, $eventToEdit.date, { id: $eventToEdit.id })
		try {
			await persistentStore.updateEvent(ev)
			updateTrackedEvent(ev)
			dispatchClose()
		} catch (err) {
			alert(`Cannot save: ${err}`)
		}
	}
	const deleteEvent = async () => {
		try {
			await persistentStore.deleteEvent($eventToEdit.id)
			deleteTrackedEvent($eventToEdit.id)
			dispatchClose()
		} catch (err) {
			alert(`Cannot delete: ${err}`)
		}
	}
</script>

<div class="modal" transition:fly={{ duration: 150, easing: quintOut, y: 250 }}>
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
				bind:value={rawDateInput}
			/>

			<div class="form-buttons">
				<button class="button" on:click={resetDate} type="button">Set to today</button>
				<button class="button bg-danger" on:click={deleteEvent} type="button">Delete</button>
				<button class="button bg-primary">Save</button>
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
		display: flex;
		flex-direction: column;
		padding: 1em 0;
	}
	.form-buttons button {
		margin: 0.3em 0;
	}

	@media screen and (min-width: 401px) {
		.form-buttons {
			flex-direction: row;
		}
		.form-buttons button {
			margin: 0.3em;
		}
		.form-buttons button:first-child {
			margin-left: 0;
		}
		.form-buttons button:last-child {
			margin-right: 0;
		}
	}
</style>
