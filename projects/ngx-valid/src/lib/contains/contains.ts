import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Configuration options for the contains validator.
 * 
 * @since 1.0.0
 */
export interface ContainsOptions {
  /**
   * Whether to perform case-insensitive search.
   * @default false
   */
  ignoreCase?: boolean;
  
  /**
   * Minimum number of occurrences required.
   * @default 1
   */
  minOccurrences?: number;
}

/**
 * Validates that a string contains a specific substring.
 * 
 * This validator checks if the input string contains a specified substring
 * with configurable case sensitivity and minimum occurrence requirements.
 * Based on the validator.js contains implementation.
 * 
 * @param element - The substring to search for
 * @param options - Configuration options for the validation
 * @param options.ignoreCase - Whether to perform case-insensitive search (default: false)
 * @param options.minOccurrences - Minimum number of occurrences required (default: 1)
 * 
 * @returns A validator function that returns null for valid strings or a validation error object
 * 
 * @example
 * ```typescript
 * // Basic usage - must contain 'hello'
 * const basicValidator = contains('hello');
 * 
 * // Case insensitive search
 * const caseInsensitiveValidator = contains('HELLO', { ignoreCase: true });
 * 
 * // Require multiple occurrences
 * const multipleValidator = contains('test', { minOccurrences: 2 });
 * 
 * // Use in reactive forms
 * const form = new FormGroup({
 *   message: new FormControl('', [contains('hello', { ignoreCase: true })]),
 * });
 * ```
 * 
 * @example
 * ```html
 * <!-- Template-driven forms -->
 * <input valContains="world" [(ngModel)]="text" />
 * <input 
 *   valContains="hello"
 *   [valContainsOptions]="{ ignoreCase: true, minOccurrences: 2 }"
 *   [(ngModel)]="text" 
 * />
 * ```
 * 
 * @since 1.0.0
 */
export function contains(
  element: string,
  options: ContainsOptions = {}
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null; // Don't validate empty values to allow optional controls
    }

    const str = String(control.value);
    const defaultOptions: Required<ContainsOptions> = {
      ignoreCase: false,
      minOccurrences: 1,
    };

    const opts = { ...defaultOptions, ...options };

    // Convert element to string (matching validator.js toString behavior)
    const elem = String(element);

    let isValid: boolean;

    // Match validator.js implementation exactly
    if (opts.ignoreCase) {
      isValid =
        str.toLowerCase().split(elem.toLowerCase()).length >
        opts.minOccurrences;
    } else {
      isValid = str.split(elem).length > opts.minOccurrences;
    }

    if (!isValid) {
      // Calculate actual occurrences for error reporting
      const actualOccurrences = opts.ignoreCase
        ? str.toLowerCase().split(elem.toLowerCase()).length - 1
        : str.split(elem).length - 1;

      return {
        contains: {
          requiredElement: element,
          actualValue: str,
          minOccurrences: opts.minOccurrences,
          actualOccurrences: actualOccurrences,
        },
      };
    }

    return null;
  };
}
