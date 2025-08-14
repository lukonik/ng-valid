import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates numbers using the Luhn algorithm (mod-10 checksum).
 *
 * The Luhn algorithm is a checksum formula used to validate identification numbers
 * including credit cards, IMEI numbers, and other identification numbers.
 *
 * The algorithm works by:
 * 1. Starting from the rightmost digit, double every second digit
 * 2. If doubling results in a two-digit number, add the digits together
 * 3. Sum all digits
 * 4. If the total is divisible by 10, the number is valid
 *
 * @returns A validator function that returns null for valid Luhn numbers or a validation error object
 *
 * @example
 * ```typescript
 * // Basic usage
 * const luhnValidator = isLuhnNumber();
 *
 * // Use in reactive forms
 * const form = new FormGroup({
 *   luhnNumber: new FormControl('', [isLuhnNumber()]),
 *   imeiNumber: new FormControl('', [isLuhnNumber()]),
 * });
 * ```
 *
 * @example
 * ```html
 * <!-- Template-driven forms -->
 * <input valIsLuhnNumber [(ngModel)]="luhnNumber" #luhnInput="ngModel" />
 * <div *ngIf="luhnInput.errors?.['isLuhnNumber']">Invalid Luhn number</div>
 * ```
 *
 * @example
 * ```typescript
 * // Test numbers
 * isLuhnNumber().validate(new FormControl('79927398713')); // null (valid)
 * isLuhnNumber().validate(new FormControl('4111111111111111')); // null (valid)
 * isLuhnNumber().validate(new FormControl('79927398714')); // error (invalid)
 * ```
 *
 * @since 1.0.0
 * @see {@link isCreditCard} for credit card specific validation
 */
export function isLuhnNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || typeof value !== 'string') {
      return null;
    }

    const sanitized = value.replace(/[- ]+/g, '');
    let sum = 0;
    let digit;
    let tmpNum;
    let shouldDouble = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
      digit = sanitized.substring(i, i + 1);
      tmpNum = parseInt(digit, 10);

      if (isNaN(tmpNum)) {
        return {
          isLuhnNumber: { actualValue: value, invalidCharacter: digit },
        };
      }

      if (shouldDouble) {
        tmpNum *= 2;
        if (tmpNum >= 10) {
          sum += (tmpNum % 10) + 1;
        } else {
          sum += tmpNum;
        }
      } else {
        sum += tmpNum;
      }
      shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;
    return isValid ? null : { isLuhnNumber: { actualValue: value } };
  };
}

/**
 * Utility function to check if a string is a valid Luhn number.
 *
 * This is a helper function used internally by other validators like isCreditCard.
 * For form validation, use the `isLuhnNumber()` validator function instead.
 *
 * @param str - The string to validate (spaces and hyphens are automatically removed)
 * @returns True if the string is a valid Luhn number, false otherwise
 *
 * @example
 * ```typescript
 * isLuhnValid('4111111111111111'); // true
 * isLuhnValid('4111-1111-1111-1111'); // true (formatting ignored)
 * isLuhnValid('4111111111111112'); // false (wrong checksum)
 * isLuhnValid('invalid'); // false (non-numeric characters)
 * ```
 *
 * @since 1.0.0
 * @see {@link isLuhnNumber} for the validator function
 */
export function isLuhnValid(str: string): boolean {
  const sanitized = str.replace(/[- ]+/g, '');
  let sum = 0;
  let digit;
  let tmpNum;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);

    if (isNaN(tmpNum)) {
      return false;
    }

    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += (tmpNum % 10) + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
