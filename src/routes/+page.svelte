<script lang="ts">
	import AddEventModal from '$lib/AddEventModal.svelte'
	import CounterItem from '$lib/CounterItem.svelte'
	import EditEventModal from '$lib/EditEventModal.svelte'
	import { dateToSqlString } from '$lib/formatter'
	import { TrackedEvent } from '$lib/models/trackedEvent'
	import { persistentStore } from '$lib/persistence/persistence'
	import { eventToEdit, sortedTrackedEvents, trackedEvents } from '$lib/stores/trackedEventStore'
	import { onDestroy, onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	let showAddModal = false
	let showEditModal = false
	let prevDate = dateToSqlString(new Date())

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
		$eventToEdit = new TrackedEvent(ce.detail.title, ce.detail.date, { id: ce.detail.id })
		toggleEditModal(true)
	}

	// Reload events when we enter a new day so that the counters update
	const reload = () => {
		const today = dateToSqlString(new Date())
		if (prevDate !== today) {
			loadEvents()
			prevDate = today
		}
	}

	onMount(() => {
		loadEvents()
		window.addEventListener('focus', reload)
	})

	onDestroy(() => {
		window.removeEventListener('focus', reload)
	})
</script>

<svelte:head>
	<title>Oma - Days Since</title>
	<meta name="description" content="Track days since important events" />
</svelte:head>

<header>
	<h1>Days since</h1>
</header>
<main>
	{#if $sortedTrackedEvents.length > 0}
		<div in:fade>
			{#each $sortedTrackedEvents as ev}
				<CounterItem trackedEvent={ev} on:click={onCounterItemClick} />
			{/each}
		</div>
	{/if}
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
		padding: 1rem 1rem 30px;
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
