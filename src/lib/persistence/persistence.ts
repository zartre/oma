import type { TrackedEvent } from '$lib/models/trackedEvent'
import { IDB } from './indexedDB'

/**
 * Persistence is an interface for persistent storage implementations.
 */
export interface Persistence {
	createEvent(e: TrackedEvent): Promise<void>
	updateEvent(e: TrackedEvent): Promise<void>
	deleteEvent(id: string): Promise<void>
	getAllEvents(): Promise<TrackedEvent[]>
}

export const persistentStore: Persistence = IDB.getInstance()
