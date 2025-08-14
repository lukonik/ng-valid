import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { contains, ContainsOptions } from './contains';

/**
 * Angular directive for validating that strings contain specific substrings in template-driven forms.
 *
 * This directive provides template-driven form integration for the contains validator.
 * It validates that input strings contain a specified substring with configurable
 * case sensitivity and minimum occurrence requirements.
 *
 * @example
 * ```html
 * <!-- Basic usage - must contain 'hello' -->
 * <input valContains="hello" [(ngModel)]="text" #textInput="ngModel" />
 * <div *ngIf="textInput.errors?.['contains']">Must contain "hello"</div>
 *
 * <!-- With options -->
 * <input
 *   valContains="test"
 *   [valContainsOptions]="{ ignoreCase: true, minOccurrences: 2 }"
 *   [(ngModel)]="text"
 * />
 *
 * <!-- Case insensitive search -->
 * <input
 *   valContains="WORLD"
 *   [valContainsOptions]="{ ignoreCase: true }"
 *   [(ngModel)]="text"
 * />
 * ```
 *
 * @since 1.0.0
 * @see {@link contains} for the underlying validator function
 */
@Directive({
  selector: '[valContains]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ContainsDirective,
      multi: true,
    },
  ],
})
export class ContainsDirective implements Validator {
  /**
   * The substring that must be contained in the input value.
   */
  readonly valContains = input.required<string>();

  /**
   * Configuration options for the contains validator.
   */
  readonly valContainsOptions = input<ContainsOptions>({});

  /**
   * Validates the control value using the contains validator.
   *
   * @param control - The form control to validate
   * @returns Validation error object if invalid, null if valid
   */
  validate(control: AbstractControl): ValidationErrors | null {
    const element = this.valContains();
    const options = this.valContainsOptions();

    return contains(element, options)(control);
  }
}
