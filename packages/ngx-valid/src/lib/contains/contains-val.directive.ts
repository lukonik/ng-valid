import { Directive, forwardRef, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { containsVal } from './contains-val.js';

/**
 * Angular standalone directive for contains validation in template-driven forms
 * 
 * Validates that a string contains a specific substring with customizable options.
 * Uses Angular v20+ signals and standalone directive pattern.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <input ngValidContains="@" [(ngModel)]="email" name="email">
 * 
 * <!-- With all options -->
 * <input 
 *   ngValidContains="@"
 *   [ngValidContainsIgnoreCase]="true"
 *   [ngValidContainsMinOccurrences]="2"
 *   [(ngModel)]="email" 
 *   name="email"
 * >
 * ```
 */
@Directive({
  selector: '[ngValidContains]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ContainsDirective),
      multi: true
    }
  ]
})
export class ContainsDirective implements Validator {
  /** The element that the input value must contain */
  element = input.required<string>({ alias: 'ngValidContains' });

  /** Whether to ignore case when checking if string contains the element */
  ignoreCase = input<boolean>(false, { alias: 'ngValidContainsIgnoreCase' });

  /** Minimum number of occurrences required */
  minOccurrences = input<number>(1, { alias: 'ngValidContainsMinOccurrences' });

  validate(control: AbstractControl): ValidationErrors | null {
    const elementValue = this.element();
    if (!elementValue) {
      return null;
    }

    const validator = containsVal(elementValue, {
      ignoreCase: this.ignoreCase(),
      minOccurrences: this.minOccurrences()
    });

    return validator(control);
  }
}