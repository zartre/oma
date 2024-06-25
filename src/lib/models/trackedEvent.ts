/**
 * TrackedEvent represents an item in the app where
 * a user tracks its last concerned date.
 */
export class TrackedEvent {
	id: number = 0
	title: string
	date: Date

	constructor(title: string, date: Date) {
		this.title = title
		this.date = date
	}
}
