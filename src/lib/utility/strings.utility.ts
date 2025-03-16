/**
 * Capitalize the first letter of a string
 * @param str The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Split a camel case string into a space separated string
 * @param str The string to split
 * @returns The split string
 */
export function splitCamelCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}
