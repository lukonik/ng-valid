import { FormControl } from '@angular/forms';
import { isLuhnNumber } from './is-luhn-number.validator';

describe('isLuhnNumber Validator', () => {
  describe('Valid Luhn numbers', () => {
    const validNumbers = [
      '4111111111111111', // Visa
      '5555555555554444', // Mastercard
      '378282246310005', // Amex
      '6011111111111117', // Discover
      '30569309025904', // Diners Club
      '3530111333300000', // JCB
      '4000000000000002', // Visa test
      '79927398713', // Random valid Luhn
      '49927398716', // Random valid Luhn
      '1234567890123452', // Random valid Luhn
    ];

    validNumbers.forEach((number) => {
      it(`should validate ${number} as a valid Luhn number`, () => {
        const control = new FormControl(number);
        const validator = isLuhnNumber();
        expect(validator(control)).toBeNull();
      });
    });
  });

  describe('Invalid Luhn numbers', () => {
    const invalidNumbers = [
      '4111111111111112', // Wrong checksum
      '5555555555554445', // Wrong checksum
      '378282246310006', // Wrong checksum
      '1234567890123456', // Wrong checksum
      '0000000000000000', // All zeros (invalid Luhn)
      '1111111111111111', // All ones (invalid Luhn)
      '12345', // Too short but wrong checksum
      '79927398714', // Wrong checksum
    ];

    invalidNumbers.forEach((number) => {
      it(`should invalidate ${number} as an invalid Luhn number`, () => {
        const control = new FormControl(number);
        const validator = isLuhnNumber();
        expect(validator(control)).toEqual({
          isLuhnNumber: { actualValue: number },
        });
      });
    });
  });

  describe('Formatted numbers', () => {
    it('should handle numbers with spaces', () => {
      const control = new FormControl('4111 1111 1111 1111');
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should handle numbers with hyphens', () => {
      const control = new FormControl('4111-1111-1111-1111');
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should handle numbers with mixed formatting', () => {
      const control = new FormControl('4111 1111-1111 1111');
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should handle invalid formatted numbers', () => {
      const control = new FormControl('4111 1111 1111 1112');
      const validator = isLuhnNumber();
      expect(validator(control)).toEqual({
        isLuhnNumber: { actualValue: '4111 1111 1111 1112' },
      });
    });
  });

  describe('Invalid characters', () => {
    it('should invalidate numbers with letters', () => {
      const control = new FormControl('411111111111111a');
      const validator = isLuhnNumber();
      expect(validator(control)).toEqual({
        isLuhnNumber: {
          actualValue: '411111111111111a',
          invalidCharacter: 'a',
        },
      });
    });

    it('should invalidate numbers with special characters', () => {
      const control = new FormControl('4111111111111111!');
      const validator = isLuhnNumber();
      expect(validator(control)).toEqual({
        isLuhnNumber: {
          actualValue: '4111111111111111!',
          invalidCharacter: '!',
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should return null for null value', () => {
      const control = new FormControl(null);
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should return null for undefined value', () => {
      const control = new FormControl(undefined);
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should return null for empty string', () => {
      const control = new FormControl('');
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should handle non-string values', () => {
      const control = new FormControl(123456789);
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should validate single digit numbers', () => {
      const control = new FormControl('0');
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull(); // Single 0 is valid Luhn
    });

    it('should validate single digit 5', () => {
      const control = new FormControl('5');
      const validator = isLuhnNumber();
      expect(validator(control)).toEqual({
        isLuhnNumber: { actualValue: '5' },
      }); // Single 5 is not valid Luhn
    });
  });

  describe('Long numbers', () => {
    it('should validate very long valid Luhn numbers', () => {
      const control = new FormControl('41111111111111111116'); // 20 digit valid Luhn
      const validator = isLuhnNumber();
      expect(validator(control)).toBeNull();
    });

    it('should invalidate very long invalid Luhn numbers', () => {
      const control = new FormControl('41111111111111111117'); // 20 digit invalid Luhn
      const validator = isLuhnNumber();
      expect(validator(control)).toEqual({
        isLuhnNumber: { actualValue: '41111111111111111117' },
      });
    });
  });
});
