import { Directive, forwardRef, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { equalsVal } from './equals-val.js';

/**
 * Angular standalone directive for equals validation in template-driven forms
 * 
 * Validates that the input value is exactly equal to a comparison value using strict equality.
 * Uses Angular v20+ signals and standalone directive pattern.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <input ngValidEquals="expectedValue" [(ngModel)]="inputValue" name="input">
 * 
 * <!-- Password confirmation example -->
 * <input type="password" [(ngModel)]="password" name="password" #pwd>
 * <input 
 *   type="password" 
 *   ngValidEquals="{{ password }}"
 *   [(ngModel)]="confirmPassword" 
 *   name="confirmPassword"
 * >
 * ```
 */
@Directive({
  selector: '[ngValidEquals]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EqualsDirective),
      multi: true
    }
  ]
})
export class EqualsDirective implements Validator {
  /** The value that the input must equal */
  comparison = input.required<any>({ alias: 'ngValidEquals' });

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = equalsVal(this.comparison());
    return validator(control);
  }
}