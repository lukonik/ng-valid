import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that a string exactly equals a specific comparison string
 * @param comparison The string to compare against
 * @returns A validator function
 */
export function equals(comparison: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null; // Don't validate empty values to allow optional controls
    }

    const str = String(control.value);

    // Match validator.js implementation exactly
    const isValid = str === comparison;

    if (!isValid) {
      return {
        equals: {
          requiredValue: comparison,
          actualValue: str,
        },
      };
    }

    return null;
  };
}
