import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { isCreditCard, IsCreditCardOptions } from './is-credit-card.validator';

/**
 * Angular directive for validating credit card numbers in template-driven forms.
 * 
 * This directive provides template-driven form integration for the isCreditCard validator.
 * It validates credit card numbers using industry-standard patterns and Luhn algorithm verification.
 * 
 * @example
 * ```html
 * <!-- Basic usage - validates any supported credit card -->
 * <input valIsCreditCard [(ngModel)]="creditCard" #cardInput="ngModel" />
 * <div *ngIf="cardInput.errors?.['isCreditCard']">Invalid credit card</div>
 * 
 * <!-- Validate specific provider -->
 * <input valIsCreditCard="visa" [(ngModel)]="visaCard" />
 * 
 * <!-- With options object -->
 * <input 
 *   valIsCreditCard
 *   [valIsCreditCardOptions]="{ provider: 'mastercard' }"
 *   [(ngModel)]="mastercardNumber" 
 * />
 * ```
 * 
 * @since 1.0.0
 * @see {@link isCreditCard} for the underlying validator function
 */
@Directive({
  selector: '[valIsCreditCard]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IsCreditCardDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class IsCreditCardDirective implements Validator {
  /**
   * The credit card provider to validate against.
   * Can be set directly as attribute value: valIsCreditCard="visa"
   */
  @Input('valIsCreditCard') provider = '';
  
  /**
   * Configuration options for the credit card validator.
   * Use this for more complex configuration or when provider is set via options.
   */
  @Input('valIsCreditCardOptions') options: IsCreditCardOptions = {};

  /**
   * Validates the control value using the isCreditCard validator.
   * 
   * @param control - The form control to validate
   * @returns Validation error object if invalid, null if valid
   */
  validate(control: AbstractControl): ValidationErrors | null {
    const finalOptions: IsCreditCardOptions = { ...this.options };
    
    if (this.provider && this.provider.trim() !== '') {
      finalOptions.provider = this.provider as IsCreditCardOptions['provider'];
    }

    const validator = isCreditCard(finalOptions);
    return validator(control);
  }
}