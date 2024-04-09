/**
 * Removes HTML tags from a given string (very, very simple to avoid dependencies)
 *
 * @param input - The string containing HTML tags.
 * @returns The string with HTML tags removed.
 */
export function stripHtmlTags(input: string): string {
  return input.replace(/<\/?[^>]+(>|$)/g, "");
}


/**
 * Copies the given URL to the clipboard.
 *
 * @param url - The URL to be copied.
 * @returns A promise that resolves when the URL is successfully copied to the clipboard.
 */
export const copyToClipboard = async (url: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(url);
    console.log('URL copied to clipboard successfully!');
  } catch (error) {
    console.error('Failed to copy URL to clipboard: ', error);
  }
};