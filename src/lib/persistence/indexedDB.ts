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
			console.warn('indexedDB.ts: window is undefined. This should happen only in SSR.')
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

	async createEvent(e: TrackedEvent): Promise<void> {
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
}
