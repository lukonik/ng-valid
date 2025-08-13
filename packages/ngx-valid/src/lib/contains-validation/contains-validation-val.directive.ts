import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { containsValidationVal } from './contains-validation-val.js';

/**
 * Angular directive for contains validation in template-driven forms
 * 
 * @example
 * ```html
 * <input 
 *   type="text" 
 *   ngModel 
 *   ngValidContains="@"
 *   [ngValidContainsIgnoreCase]="true"
 *   [ngValidContainsMinOccurrences]="1"
 * >
 * ```
 */
@Directive({
  selector: '[ngValidContains]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContainsValidationDirective),
      multi: true
    }
  ]
})
export class ContainsValidationDirective implements Validator {
  /** The element that the input value must contain */
  @Input('ngValidContains') element: string = '';

  /** Whether to ignore case when checking if string contains the element */
  @Input('ngValidContainsIgnoreCase') ignoreCase: boolean = false;

  /** Minimum number of occurrences required */
  @Input('ngValidContainsMinOccurrences') minOccurrences: number = 1;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.element) {
      return null;
    }

    const validator = containsValidationVal(this.element, {
      ignoreCase: this.ignoreCase,
      minOccurrences: this.minOccurrences
    });

    return validator(control);
  }
}