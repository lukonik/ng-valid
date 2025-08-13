import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Options for blacklist validation
 */
export interface BlacklistOptions {
  /** Custom error key for validation errors */
  errorKey?: string;
}

/**
 * Angular validator function that removes blacklisted characters from input
 * Based on validator.js blacklist implementation
 * 
 * Note: This validator transforms the input value by removing blacklisted characters.
 * It does NOT return validation errors - it modifies the control value instead.
 * 
 * @param chars Characters to remove from the input (blacklisted characters)
 * @param options Validation options
 * @returns ValidatorFn that removes blacklisted characters from input
 * 
 * @example
 * ```typescript
 * // Remove special characters from input
 * const control = new FormControl('', blacklistVal('!@#$%'));
 * control.setValue('hello@world!'); // becomes 'helloworld'
 * ```
 */
export function blacklistVal(
  chars: string,
  options: BlacklistOptions = {}
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Return null if no value
    if (!control.value && control.value !== 0) {
      return null;
    }

    // Convert value to string
    const value = String(control.value);
    
    if (!chars) {
      return null;
    }

    // Create regex to match blacklisted characters
    // Escape special regex characters in the chars string
    const escapedChars = chars.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
    const blacklistRegex = new RegExp(`[${escapedChars}]+`, 'g');
    
    // Remove blacklisted characters
    const cleanedValue = value.replace(blacklistRegex, '');
    
    // Update the control value if it changed
    if (cleanedValue !== value) {
      // Use setTimeout to avoid "ExpressionChangedAfterItHasBeenCheckedError"
      setTimeout(() => {
        control.setValue(cleanedValue, { emitEvent: false });
      });
    }

    // This validator always returns null as it transforms rather than validates
    return null;
  };
}