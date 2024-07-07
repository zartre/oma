<script lang="ts">
	import AddEventModal from '$lib/AddEventModal.svelte'
	import CounterItem from '$lib/CounterItem.svelte'
	import { persistentStore } from '$lib/persistence/persistence'
	import { onMount } from 'svelte'
	import { trackedEvents, sortedTrackedEvents, eventToEdit } from '$lib/stores/trackedEventStore'
	import EditEventModal from '$lib/EditEventModal.svelte'
	import type { TrackedEvent } from '$lib/models/trackedEvent'

	let showAddModal = false
	let showEditModal = false

	const loadEvents = () =>
		persistentStore.getAllEvents().then((events) => {
			$trackedEvents = events
		})

	const toggleAddModal = (shouldShow: boolean) => (showAddModal = shouldShow)
	const toggleEditModal = (shouldShow: boolean) => (showEditModal = shouldShow)

	const onAddEventClose = () => {
		toggleAddModal(false)
	}
	const onEditEventClose = () => {
		toggleEditModal(false)
	}
	const onCounterItemClick = (ce: CustomEvent<TrackedEvent>) => {
		$eventToEdit = ce.detail
		toggleEditModal(true)
	}

	onMount(() => {
		loadEvents()
	})
</script>

<header>
	<h1>Days since</h1>
</header>
<main>
	{#each $sortedTrackedEvents as ev}
		<CounterItem trackedEvent={ev} on:click={onCounterItemClick} />
	{/each}
	{#if showAddModal}
		<AddEventModal on:close={onAddEventClose} />
	{/if}
	{#if showEditModal}
		<EditEventModal on:close={onEditEventClose} />
	{/if}
</main>
<footer>
	<button class="button" on:click={() => toggleAddModal(true)}>Add</button>
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
