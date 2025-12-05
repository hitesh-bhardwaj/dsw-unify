import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Merges class names with Tailwind CSS conflict resolution.
 *
 * @param {...(string|undefined|null|false)} inputs - Class names or conditional class names to merge.
 * @returns {string} The merged class names string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
