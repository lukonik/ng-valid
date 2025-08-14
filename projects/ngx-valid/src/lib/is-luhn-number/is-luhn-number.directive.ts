import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { isLuhnNumber } from './is-luhn-number.validator';

/**
 * Angular directive for validating Luhn numbers in template-driven forms.
 *
 * This directive provides template-driven form integration for the isLuhnNumber validator.
 * It validates numbers using the Luhn algorithm (mod-10 checksum), commonly used for
 * credit cards, IMEI numbers, and other identification numbers.
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <input valIsLuhnNumber [(ngModel)]="luhnNumber" #luhnInput="ngModel" />
 * <div *ngIf="luhnInput.errors?.['isLuhnNumber']">Invalid Luhn number</div>
 *
 * <!-- With error details -->
 * <input valIsLuhnNumber [(ngModel)]="imeiNumber" #imeiInput="ngModel" />
 * <div *ngIf="imeiInput.errors?.['isLuhnNumber']">
 *   <span *ngIf="imeiInput.errors['isLuhnNumber'].invalidCharacter">
 *     Contains invalid character: {{ imeiInput.errors['isLuhnNumber'].invalidCharacter }}
 *   </span>
 *   <span *ngIf="!imeiInput.errors['isLuhnNumber'].invalidCharacter">
 *     Invalid checksum
 *   </span>
 * </div>
 * ```
 *
 * @since 1.0.0
 * @see {@link isLuhnNumber} for the underlying validator function
 */
@Directive({
  selector: '[valIsLuhnNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IsLuhnNumberDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class IsLuhnNumberDirective implements Validator {
  /**
   * Validates the control value using the isLuhnNumber validator.
   *
   * @param control - The form control to validate
   * @returns Validation error object if invalid, null if valid
   */
  validate(control: AbstractControl): ValidationErrors | null {
    const validator = isLuhnNumber();
    return validator(control);
  }
}
