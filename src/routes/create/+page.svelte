<script lang="ts">
	import { TrackedEvent } from '$lib/models/trackedEvent'
	import { persistentStore } from '$lib/persistence/persistence'

	let eventTitle = ''
	let eventDate = ''

	const goBack = () => {
		window.history.back()
	}

	const save = async () => {
		const d = new Date(eventDate);
		const ev = new TrackedEvent(eventTitle, d);
		try {
			await persistentStore.createEvent(ev);
			goBack();
		} catch (err) {
			alert('Cannot save')
		}
	};
</script>

<header>
	<button class="text-button" on:click={goBack}>Back</button>
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
			bind:value={eventTitle}
		/>

		<label for="event-date">Last date</label>
		<input
			type="date"
			id="date"
			autocomplete="off"
			placeholder="Pick the last date"
			bind:value={eventDate}
		/>

		<div class="form-buttons">
			<button class="button">Add</button>
		</div>
	</form>
</main>

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
