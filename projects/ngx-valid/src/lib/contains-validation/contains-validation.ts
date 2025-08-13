/**
 * Options for contains validation
 */
export interface ContainsValidationOptions {
  /** Whether to ignore case when checking if string contains the element */
  ignoreCase?: boolean;
  /** Minimum number of occurrences required */
  minOccurrences?: number;
}

/**
 * Checks if a string contains a specific element
 * Based on validator.js contains implementation
 * 
 * @param str The string to check
 * @param element The element to search for
 * @param options Validation options
 * @returns true if string contains the element, false otherwise
 */
export function containsValidation(
  str: string, 
  element: string, 
  options: ContainsValidationOptions = {}
): boolean {
  if (typeof str !== 'string' || typeof element !== 'string') {
    return false;
  }

  const { ignoreCase = false, minOccurrences = 1 } = options;

  if (minOccurrences < 1) {
    return false;
  }

  let searchStr = str;
  let searchElement = element;

  if (ignoreCase) {
    searchStr = str.toLowerCase();
    searchElement = element.toLowerCase();
  }

  // Handle empty element case - empty string is contained in any string
  if (searchElement === '') {
    return true;
  }

  // Count occurrences by splitting and checking array length
  const parts = searchStr.split(searchElement);
  const occurrences = parts.length - 1;

  return occurrences >= minOccurrences;
}