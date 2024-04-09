/**
 * Removes HTML tags from a given string (very, very simple to avoid dependencies)
 *
 * @param input - The string containing HTML tags.
 * @returns The string with HTML tags removed.
 */
export function stripHtmlTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}