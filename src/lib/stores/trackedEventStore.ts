import type { TrackedEvent } from '$lib/models/trackedEvent'
import { derived, writable } from 'svelte/store'

export const trackedEvents = writable<TrackedEvent[]>([])

export const sortedTrackedEvents = derived(trackedEvents, ($trackedEvents) =>
	$trackedEvents.sort((a, b) => a.title.localeCompare(b.title))
)

export const eventToEdit = writable<TrackedEvent>()

export const deleteTrackedEvent = (id: string) => {
	trackedEvents.update((events) => events.filter((event) => event.id !== id))
}
