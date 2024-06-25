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

	private constructor() {}

	static getInstance(): IDB {
		if (!this.instance) this.instance = new IDB()
		return this.instance
	}

	private initDB() {
		return new Promise<void>((resolve, reject) => {
			// Check for window object so that SvelteKit can render pages on server side.
			if (typeof window == 'undefined') {
				console.warn('indexedDB.ts: window is undefined. This should happen only in SSR.')
				resolve()
			}

			const req = window.indexedDB.open(PUBLIC_DB_NAME, 1)

			req.onerror = (event) => {
				console.error(
					'Cannot open a DB connection:',
					(<IDBOpenDBRequest>event.target).error?.message
				)
				reject((<IDBOpenDBRequest>event.target).error)
			}

			req.onsuccess = (event) => {
				this.db = (<IDBOpenDBRequest>event.target).result
				resolve()
			}

			req.onupgradeneeded = (event) => {
				const db = (<IDBOpenDBRequest>event.target).result

				db.createObjectStore(this.TRACKED_EVENT_STORE_NAME, { autoIncrement: false, keyPath: 'id' })
			}
		})
	}

	async createEvent(e: TrackedEvent): Promise<void> {
		if (!this.db) await this.initDB()

		const txn = this.db.transaction(this.TRACKED_EVENT_STORE_NAME, 'readwrite')

		return new Promise((resolve, reject) => {
			txn.oncomplete = () => {
				resolve()
			}

			txn.onerror = (event) => {
				reject(event)
			}

			txn.objectStore(this.TRACKED_EVENT_STORE_NAME).add(e)
		})
	}

	async getAllEvents(): Promise<TrackedEvent[]> {
		if (!this.db) await this.initDB()

		const txn = this.db.transaction(this.TRACKED_EVENT_STORE_NAME, 'readonly')
		const req = txn.objectStore(this.TRACKED_EVENT_STORE_NAME).getAll()
		return new Promise((resolve, reject) => {
			txn.oncomplete = () => {
				resolve(<TrackedEvent[]>req.result)
			}
			txn.onerror = (ev) => {
				console.error('Error in getAllEvents:', ev.target)
				reject(ev)
			}
		})
	}
}
