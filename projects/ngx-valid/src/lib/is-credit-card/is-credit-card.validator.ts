import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isLuhnValid } from '../is-luhn-number';

/**
 * Configuration options for the isCreditCard validator.
 * 
 * @since 1.0.0
 */
export interface IsCreditCardOptions {
  /**
   * Optional specific credit card provider to validate against.
   * If not provided, any valid credit card from supported providers will be accepted.
   * 
   * Supported providers:
   * - 'amex': American Express
   * - 'dinersclub': Diners Club
   * - 'discover': Discover
   * - 'jcb': JCB
   * - 'mastercard': Mastercard
   * - 'unionpay': UnionPay
   * - 'visa': Visa
   */
  provider?: 'amex' | 'dinersclub' | 'discover' | 'jcb' | 'mastercard' | 'unionpay' | 'visa';
}

/**
 * Regular expressions for validating different credit card providers.
 * Based on industry-standard patterns from validator.js.
 * 
 * @internal
 */
const cards = {
  amex: /^3[47][0-9]{13}$/,
  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/,
};

/**
 * Array of all supported credit card provider regular expressions.
 * 
 * @internal
 */
const allCards = Object.values(cards);

/**
 * Validates credit card numbers using industry-standard patterns and Luhn algorithm verification.
 * 
 * This validator performs comprehensive credit card validation by:
 * 1. Checking the card number format against industry-standard patterns
 * 2. Optionally validating against a specific card provider
 * 3. Verifying the number using the Luhn algorithm (mod-10 checksum)
 * 
 * The validator supports all major credit card providers including Visa, Mastercard,
 * American Express, Discover, Diners Club, JCB, and UnionPay.
 * 
 * @param options - Configuration options for the validator
 * @param options.provider - Optional specific card provider to validate against
 * 
 * @returns A validator function that returns null for valid credit cards or a validation error object
 * 
 * @example
 * ```typescript
 * // Basic usage - validates any supported credit card
 * const anyCardValidator = isCreditCard();
 * 
 * // Validate specific provider
 * const visaValidator = isCreditCard({ provider: 'visa' });
 * const mastercardValidator = isCreditCard({ provider: 'mastercard' });
 * 
 * // Use in reactive forms
 * const form = new FormGroup({
 *   creditCard: new FormControl('', [isCreditCard()]),
 *   visaCard: new FormControl('', [isCreditCard({ provider: 'visa' })]),
 * });
 * ```
 * 
 * @example
 * ```html
 * <!-- Template-driven forms -->
 * <input valIsCreditCard [(ngModel)]="creditCard" />
 * <input valIsCreditCard="visa" [(ngModel)]="visaCard" />
 * <input 
 *   valIsCreditCard
 *   [valIsCreditCardOptions]="{ provider: 'mastercard' }"
 *   [(ngModel)]="mastercardNumber" 
 * />
 * ```
 * 
 * @since 1.0.0
 * @see {@link isLuhnNumber} for standalone Luhn algorithm validation
 */
export function isCreditCard(options: IsCreditCardOptions = {}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value || typeof value !== 'string') {
      return null;
    }
    
    const { provider } = options;
    const sanitized = value.replace(/[- ]+/g, '');
    
    if (provider && provider.toLowerCase() in cards) {
      // specific provider in the list
      const lowerProvider = provider.toLowerCase() as keyof typeof cards;
      if (!cards[lowerProvider].test(sanitized)) {
        return { isCreditCard: { actualValue: value, provider } };
      }
    } else if (provider && !(provider.toLowerCase() in cards)) {
      // specific provider not in the list
      throw new Error(`${provider} is not a valid credit card provider.`);
    } else if (!allCards.some(cardProvider => cardProvider.test(sanitized))) {
      // no specific provider
      return { isCreditCard: { actualValue: value } };
    }
    
    if (!isLuhnValid(value)) {
      return { isCreditCard: { actualValue: value, luhnValid: false } };
    }
    
    return null;
  };
}