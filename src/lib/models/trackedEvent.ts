import { v4 as uuid } from '@lukeed/uuid'

/**
 * TrackedEvent represents an item in the app where
 * a user tracks its last concerned date.
 */
export class TrackedEvent {
	id: string = ''
	title: string
	date: Date

	constructor(title: string, date: Date, opts?: TrackedEventOption) {
		this.title = title
		this.date = date

		if (!opts?.id) this.generateID()
	}

	generateID() {
		this.id = uuid()
	}
}

interface TrackedEventOption {
	// If not given, a new ID will be assigned to the TrackedEvent.
	id?: string
}
