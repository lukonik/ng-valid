import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface IsAfterOptions {
  comparisonDate?: string | Date;
}

/**
 * Convert input to a Date object
 * @param date The date to convert
 * @returns Date object or null if invalid
 */
function toDate(date: string | Date): Date | null {
  if (!date) return null;

  if (date instanceof Date) {
    return date;
  }

  // For string input, attempt to parse
  const parsed = Date.parse(String(date));
  return !isNaN(parsed) ? new Date(parsed) : null;
}

/**
 * Validates that a date is after a specific comparison date
 * @param options Configuration options for the validation
 * @returns A validator function
 */
export function isAfter(options: IsAfterOptions = {}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null; // Don't validate empty values to allow optional controls
    }

    // Handle backwards compatibility by checking if options has comparisonDate
    const comparisonDate = options.comparisonDate || new Date().toString();

    const comparison = toDate(comparisonDate);
    const original = toDate(control.value);

    // Match validator.js implementation exactly
    const isValid = !!(original && comparison && original > comparison);

    if (!isValid) {
      return {
        isAfter: {
          comparisonDate: comparisonDate,
          actualValue: control.value,
        },
      };
    }

    return null;
  };
}
