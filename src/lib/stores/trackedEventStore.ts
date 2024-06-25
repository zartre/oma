import type { TrackedEvent } from '$lib/models/trackedEvent'
import { writable } from 'svelte/store'

export const trackedEvents = writable<TrackedEvent[]>([])
