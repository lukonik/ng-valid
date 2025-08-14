import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface IsBeforeOptions {
  comparisonDate?: string | Date;
}

function toDate(date: string | Date | null | undefined): Date | null {
  if (!date) return null;

  if (date instanceof Date) {
    return isNaN(date.getTime()) ? null : date;
  }

  const parsed = Date.parse(date);
  return !isNaN(parsed) ? new Date(parsed) : null;
}

export function isBefore(options: IsBeforeOptions = {}): ValidatorFn {
  return (control: AbstractControl): Record<string, unknown> | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const comparisonDate = options.comparisonDate || new Date();
    const comparison = toDate(comparisonDate);
    const original = toDate(value);

    const isValid = !!(original && comparison && original < comparison);

    return isValid
      ? null
      : {
          isBefore: {
            comparisonDate: options.comparisonDate || new Date(),
            actualValue: value,
          },
        };
  };
}
