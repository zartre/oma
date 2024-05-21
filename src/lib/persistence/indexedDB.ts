import { PUBLIC_DB_NAME } from '$env/static/public'
import type { TrackedEvent } from '$lib/models/trackedEvent'
import type { Persistence } from './persistence'

/**
 * IDB uses IndexedDB in the browser to store data persistently.
 */
export class IDB implements Persistence {
	private TRACKED_EVENT_STORE_NAME = 'tracked_events'
	private static instance: IDB
	private db!: IDBDatabase

	private constructor() {
		// Check for window object so that SvelteKit can render pages on server side.
		if (typeof window == 'undefined') {
			console.warn("indexedDB.ts: window is undefined. This should happen only in SSR.")
			return
		}

		const req = window.indexedDB.open(PUBLIC_DB_NAME, 1)
		req.onerror = (event) => {
			console.error('Cannot open a DB connection:', (<IDBOpenDBRequest>event.target).error?.message)
			throw (<IDBOpenDBRequest>event.target).error
		}
		req.onsuccess = (event) => {
			this.db = (<IDBOpenDBRequest>event.target).result
		}
		req.onupgradeneeded = (event) => {
			const db = (<IDBOpenDBRequest>event.target).result

			db.createObjectStore(this.TRACKED_EVENT_STORE_NAME, { autoIncrement: true })
		}
	}

	static getInstance(): IDB {
		if (!this.instance) this.instance = new IDB()
		return this.instance
	}

	createEvent(e: TrackedEvent): void {
		console.log(PUBLIC_DB_NAME)
		console.log(`New event ${e.title} ${e.date}`)

		const txn = this.db.transaction(this.TRACKED_EVENT_STORE_NAME, 'readwrite')

		txn.oncomplete = (event) => {
			console.info('Transaction completed.')
		}

		txn.onerror = (event) => {
			console.error('Transaction failed.')
			// TODO: Handle error
		}

		const req = txn.objectStore(this.TRACKED_EVENT_STORE_NAME).add(e)

		req.onsuccess = (event) => {
			console.info('Event added to DB.')
		}

		req.onerror = (event) => {
			console.error('Event not added to DB.')
			// TODO: Handle error
		}
	}
}
