import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface ContainsOptions {
  ignoreCase?: boolean;
  minOccurrences?: number;
}

/**
 * Validates that a string contains a specific substring
 * @param element The substring to search for
 * @param options Configuration options for the validation
 * @returns A validator function
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
