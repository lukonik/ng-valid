import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { blacklistVal } from './blacklist-val.js';

/**
 * Angular directive for blacklist validation in template-driven forms
 * 
 * This directive automatically removes blacklisted characters from input as the user types.
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
  @Input('ngValidBlacklist') chars: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.chars) {
      return null;
    }

    const validator = blacklistVal(this.chars);
    return validator(control);
  }
}