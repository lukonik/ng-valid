import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Angular validator function for equals validation
 * 
 * Validates that the input value is exactly equal to a comparison value using strict equality.
 * Based on validator.js equals implementation.
 * 
 * @param comparison The value that the input must equal
 * @returns ValidatorFn that validates if input equals the comparison value
 * 
 * @example
 * ```typescript
 * // Basic usage - password confirmation
 * const passwordControl = new FormControl('password123');
 * const confirmControl = new FormControl('', equalsVal('password123'));
 * 
 * // Dynamic comparison with another control
 * const confirmPasswordValidator = (passwordControl: FormControl) => 
 *   equalsVal(passwordControl.value);
 * ```
 */
export function equalsVal(comparison: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Return null if no value (let required validator handle empty values)
    if (!control.value && control.value !== 0 && control.value !== false) {
      return null;
    }

    // Convert control value to string for comparison (like validator.js)
    const value = String(control.value);
    
    // Perform strict equality comparison
    const isValid = value === comparison;

    if (isValid) {
      return null;
    }

    // Return validation error with context
    return {
      equals: {
        actualValue: control.value,
        expectedValue: comparison,
        actualValueAsString: value
      }
    };
  };
}