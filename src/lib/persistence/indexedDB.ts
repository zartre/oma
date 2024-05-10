import type { TrackedEvent } from '$lib/models/trackedEvent';
import type { Persistence } from './persistence';

/**
 * IDB uses IndexedDB in the browser to store data persistently.
 */
export class IDB implements Persistence {
	private static instance: IDB;

	private constructor() {}

	static getInstance(): IDB {
		if (!this.instance) this.instance = new IDB();
		return this.instance;
	}

	createEvent(e: TrackedEvent): void {
		console.log(`New event ${e.title} ${e.date}`);
	}
}
