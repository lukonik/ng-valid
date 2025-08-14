import { Directive, input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { equals } from './equals';

/**
 * Angular directive for validating exact string equality in template-driven forms.
 *
 * This directive provides template-driven form integration for the equals validator.
 * It validates that input values exactly match a specified comparison string,
 * perfect for password confirmation and exact value matching.
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <input valEquals="expected-value" [(ngModel)]="text" #textInput="ngModel" />
 * <div *ngIf="textInput.errors?.['equals']">Must exactly match "expected-value"</div>
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
 * @see {@link equals} for the underlying validator function
 */
@Directive({
  selector: '[valEquals]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualsDirective,
      multi: true,
    },
  ],
})
export class EqualsDirective implements Validator {
  /**
   * The value that the input must exactly match.
   */
  readonly valEquals = input.required<string>();

  /**
   * Validates the control value using the equals validator.
   *
   * @param control - The form control to validate
   * @returns Validation error object if invalid, null if valid
   */
  validate(control: AbstractControl): ValidationErrors | null {
    const comparison = this.valEquals();

    return equals(comparison)(control);
  }
}
