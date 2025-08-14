import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Configuration options for the isAfter validator.
 * 
 * @since 1.0.0
 */
export interface IsAfterOptions {
  /**
   * The date to compare against. The input date must be after this date.
   * @default new Date() (current date/time)
   */
  comparisonDate?: string | Date;
}

/**
 * Convert input to a Date object.
 * 
 * @internal
 * @param date - The date to convert
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
 * Validates that a date is after a specific comparison date.
 * 
 * This validator checks if the input date comes after a specified comparison date.
 * Supports both Date objects and string date inputs with timezone handling.
 * Based on the validator.js isAfter implementation.
 * 
 * @param options - Configuration options for the validation
 * @param options.comparisonDate - The date to compare against (default: current date/time)
 * 
 * @returns A validator function that returns null for valid dates or a validation error object
 * 
 * @example
 * ```typescript
 * // Must be after current date/time
 * const afterNowValidator = isAfter();
 * 
 * // Must be after specific date
 * const afterDateValidator = isAfter({ comparisonDate: '2024-01-01' });
 * const afterDateObjValidator = isAfter({ comparisonDate: new Date('2024-01-01') });
 * 
 * // Use in reactive forms
 * const form = new FormGroup({
 *   startDate: new FormControl(''),
 *   endDate: new FormControl('', [isAfter({ comparisonDate: '2024-01-01' })])
 * });
 * ```
 * 
 * @example
 * ```html
 * <!-- Template-driven forms -->
 * <input type="date" valIsAfter [(ngModel)]="selectedDate" />
 * <input type="date" valIsAfter="2024-01-01" [(ngModel)]="selectedDate" />
 * 
 * <!-- Dynamic comparison -->
 * <input type="date" [(ngModel)]="startDate" #start="ngModel" />
 * <input type="date" [valIsAfter]="start.value" [(ngModel)]="endDate" />
 * ```
 * 
 * @since 1.0.0
 * @see {@link isBefore} for the opposite validation
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
