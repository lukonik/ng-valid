import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
 * Angular validator function for contains validation
 * 
 * Validates that a string contains a specific substring with customizable options.
 * Based on validator.js contains implementation.
 * 
 * @param element The element that the input value must contain
 * @param options Validation options
 * @returns ValidatorFn that validates if input contains the specified element
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const control = new FormControl('', containsVal('@'));
 * 
 * // With options
 * const advancedControl = new FormControl('', containsVal('@', {
 *   ignoreCase: true,
 *   minOccurrences: 2
 * }));
 * ```
 */
export function containsVal(
  element: string,
  options: ContainsValidationOptions = {}
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Return null if no value (let required validator handle empty values)
    if (!control.value && control.value !== 0) {
      return null;
    }

    const value = String(control.value);
    
    // Validation logic directly in the Angular validator function
    if (typeof value !== 'string' || typeof element !== 'string') {
      return {
        contains: {
          actualValue: control.value,
          requiredElement: element,
          ignoreCase: options.ignoreCase || false,
          minOccurrences: options.minOccurrences || 1
        }
      };
    }

    const { ignoreCase = false, minOccurrences = 1 } = options;

    if (minOccurrences < 1) {
      return {
        contains: {
          actualValue: control.value,
          requiredElement: element,
          ignoreCase,
          minOccurrences
        }
      };
    }

    let searchStr = value;
    let searchElement = element;

    if (ignoreCase) {
      searchStr = value.toLowerCase();
      searchElement = element.toLowerCase();
    }

    // Handle empty element case - empty string is contained in any string
    if (searchElement === '') {
      return null;
    }

    // Count occurrences by splitting and checking array length
    const parts = searchStr.split(searchElement);
    const occurrences = parts.length - 1;

    const isValid = occurrences >= minOccurrences;

    if (isValid) {
      return null;
    }

    // Return validation error with context
    return {
      contains: {
        actualValue: control.value,
        requiredElement: element,
        ignoreCase,
        minOccurrences
      }
    };
  };
}