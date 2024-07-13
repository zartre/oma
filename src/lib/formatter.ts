/**
 * Converts a date object into a string
 * @param d {Date} Date to convert
 * @returns Date string formatted in yyyy-mm-dd
 */
export const dateToSqlString = (d: Date): string =>
	`${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
		.getDate()
		.toString()
		.padStart(2, '0')}`
