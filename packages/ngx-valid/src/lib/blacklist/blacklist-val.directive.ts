import { Directive, forwardRef, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { blacklistVal } from './blacklist-val.js';

/**
 * Angular standalone directive for blacklist validation in template-driven forms
 * 
 * This directive automatically removes blacklisted characters from input as the user types.
 * Uses Angular v20+ signals and standalone directive pattern.
 * 
 * @example
 * ```html
 * <!-- Remove special characters from input -->
 * <input 
 *   type="text" 
 *   ngModel 
 *   ngValidBlacklist="!@#$%^&*()"
 *   placeholder="Only letters and numbers allowed"
 * >
 * 
 * <!-- Remove specific characters -->
 * <input 
 *   type="text" 
 *   ngModel 
 *   ngValidBlacklist="aeiou"
 *   placeholder="No vowels allowed"
 * >
 * ```
 */
@Directive({
  selector: '[ngValidBlacklist]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BlacklistDirective),
      multi: true
    }
  ]
})
export class BlacklistDirective implements Validator {
  /** Characters to remove from the input (blacklisted characters) */
  chars = input.required<string>({ alias: 'ngValidBlacklist' });

  validate(control: AbstractControl): ValidationErrors | null {
    const charsValue = this.chars();
    if (!charsValue) {
      return null;
    }

    const validator = blacklistVal(charsValue);
    return validator(control);
  }
}