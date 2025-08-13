import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { containsValidation, ContainsValidationOptions } from './contains-validation';

/**
 * Angular validator function for contains validation
 *
 * @param element The element that the input value must contain
 * @param options Validation options
 * @returns ValidatorFn that validates if input contains the specified element
 */
export function containsValidationVal(
  element: string,
  options: ContainsValidationOptions = {}
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Return null if no value (let required validator handle empty values)
    if (!control.value && control.value !== 0) {
      return null;
    }

    const value = String(control.value);
    const isValid = containsValidation(value, element, options);

    if (isValid) {
      return null;
    }

    // Return validation error with context
    return {
      contains: {
        actualValue: control.value,
        requiredElement: element,
        ignoreCase: options.ignoreCase || false,
        minOccurrences: options.minOccurrences || 1
      }
    };
  };
}
