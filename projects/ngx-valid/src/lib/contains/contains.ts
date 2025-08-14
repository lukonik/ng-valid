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

    const value = String(control.value);
    const defaultOptions: Required<ContainsOptions> = {
      ignoreCase: false,
      minOccurrences: 1,
    };

    const opts = { ...defaultOptions, ...options };

    let searchValue = value;
    let searchElement = element;

    if (opts.ignoreCase) {
      searchValue = value.toLowerCase();
      searchElement = element.toLowerCase();
    }

    // Count occurrences (including overlapping ones)
    let occurrences = 0;
    let startIndex = 0;

    while (true) {
      const foundIndex = searchValue.indexOf(searchElement, startIndex);
      if (foundIndex === -1) break;

      occurrences++;
      startIndex = foundIndex + 1; // Move by 1 to catch overlapping matches
    }

    if (occurrences < opts.minOccurrences) {
      return {
        contains: {
          requiredElement: element,
          actualValue: value,
          minOccurrences: opts.minOccurrences,
          actualOccurrences: occurrences,
        },
      };
    }

    return null;
  };
}
