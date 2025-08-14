import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that a string exactly equals a specific comparison value.
 * 
 * This validator performs strict string equality comparison between the input value
 * and a specified comparison string. Perfect for exact matches and confirmations
 * such as password confirmation fields.
 * 
 * @param comparison - The string to compare against
 * 
 * @returns A validator function that returns null for exact matches or a validation error object
 * 
 * @example
 * ```typescript
 * // Basic usage - must exactly equal 'expected'
 * const exactValidator = equals('expected');
 * 
 * // Password confirmation
 * const passwordValidator = equals('user-entered-password');
 * 
 * // Use in reactive forms
 * const form = new FormGroup({
 *   password: new FormControl(''),
 *   confirmPassword: new FormControl(''),
 * });
 * 
 * // Dynamic validation - update when password changes
 * form.get('password')?.valueChanges.subscribe(password => {
 *   form.get('confirmPassword')?.setValidators([equals(password || '')]);
 *   form.get('confirmPassword')?.updateValueAndValidity();
 * });
 * ```
 * 
 * @example
 * ```html
 * <!-- Template-driven forms -->
 * <input valEquals="expected-value" [(ngModel)]="text" />
 * 
 * <!-- Password confirmation -->
 * <input type="password" [(ngModel)]="password" #pwd="ngModel" />
 * <input 
 *   type="password"
 *   [valEquals]="pwd.value || ''"
 *   [(ngModel)]="confirmPassword"
 *   #confirmPwd="ngModel" 
 * />
 * <div *ngIf="confirmPwd.errors?.['equals']">Passwords do not match</div>
 * ```
 * 
 * @since 1.0.0
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
