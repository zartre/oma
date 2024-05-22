import type { TrackedEvent } from '$lib/models/trackedEvent'
import { IDB } from './indexedDB'

/**
 * Persistence is an interface for persistent storage implementations.
 */
export interface Persistence {
	createEvent(e: TrackedEvent): void
}

export const persistentStore: Persistence = IDB.getInstance()
