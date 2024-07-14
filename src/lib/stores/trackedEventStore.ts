import type { TrackedEvent } from '$lib/models/trackedEvent'
import { derived, writable } from 'svelte/store'

export const trackedEvents = writable<TrackedEvent[]>([])

export const sortedTrackedEvents = derived(trackedEvents, ($trackedEvents) =>
	$trackedEvents.sort((a, b) => a.title.localeCompare(b.title))
)

export const eventToEdit = writable<TrackedEvent>()

export const addTrackedEvent = (ev: TrackedEvent) =>
	trackedEvents.update((items) => {
		items.push(ev)
		return items
	})

export const updateTrackedEvent = (ev: TrackedEvent) => {
	trackedEvents.update((items) => {
		const idx = items.findIndex((e) => e.id === ev.id)
		if (idx !== -1) items[idx] = ev
		return items
	})
}

export const deleteTrackedEvent = (id: string) => {
	trackedEvents.update((events) => events.filter((event) => event.id !== id))
}
