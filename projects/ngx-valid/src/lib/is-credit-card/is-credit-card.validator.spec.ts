import { FormControl } from '@angular/forms';
import { isCreditCard } from './is-credit-card.validator';

describe('isCreditCard Validator', () => {
  describe('Valid credit cards', () => {
    const validCards = [
      // Visa
      '4111111111111111',
      '4012888888881881',
      '4222222222222',
      '4242424242424242',

      // Mastercard
      '5555555555554444',
      '5105105105105100',
      '2223003122003222',

      // American Express
      '378282246310005',
      '371449635398431',
      '378734493671000',

      // Discover
      '6011111111111117',
      '6011000990139424',

      // Diners Club
      '30569309025904',
      '38520000023237',

      // JCB
      '3530111333300000',
      '3566002020360505',
    ];

    validCards.forEach((card) => {
      it(`should validate ${card} as a valid credit card`, () => {
        const control = new FormControl(card);
        const validator = isCreditCard();
        expect(validator(control)).toBeNull();
      });
    });
  });

  describe('Invalid credit cards', () => {
    const invalidCards = [
      '1234567890123456', // Random numbers
      '4111111111111112', // Wrong Luhn checksum
      '42424242424242424', // Too long
      '424242424242424', // Too short
      '5555555555554445', // Wrong Luhn checksum
      'abcd1234efgh5678', // Contains letters
      '', // Empty string
      '0000000000000000', // All zeros
    ];

    invalidCards.forEach((card) => {
      it(`should invalidate ${card} as an invalid credit card`, () => {
        const control = new FormControl(card);
        const validator = isCreditCard();
        expect(validator(control)).toEqual({
          isCreditCard: jasmine.any(Object),
        });
      });
    });
  });

  describe('Provider-specific validation', () => {
    it('should validate Visa cards when provider is specified', () => {
      const control = new FormControl('4111111111111111');
      const validator = isCreditCard({ provider: 'visa' });
      expect(validator(control)).toBeNull();
    });

    it('should invalidate Mastercard when Visa provider is specified', () => {
      const control = new FormControl('5555555555554444');
      const validator = isCreditCard({ provider: 'visa' });
      expect(validator(control)).toEqual({
        isCreditCard: {
          actualValue: '5555555555554444',
          provider: 'visa',
        },
      });
    });

    it('should validate American Express cards when provider is specified', () => {
      const control = new FormControl('378282246310005');
      const validator = isCreditCard({ provider: 'amex' });
      expect(validator(control)).toBeNull();
    });

    it('should validate Mastercard when provider is specified', () => {
      const control = new FormControl('5555555555554444');
      const validator = isCreditCard({ provider: 'mastercard' });
      expect(validator(control)).toBeNull();
    });

    it('should validate Discover cards when provider is specified', () => {
      const control = new FormControl('6011111111111117');
      const validator = isCreditCard({ provider: 'discover' });
      expect(validator(control)).toBeNull();
    });

    it('should validate Diners Club cards when provider is specified', () => {
      const control = new FormControl('30569309025904');
      const validator = isCreditCard({ provider: 'dinersclub' });
      expect(validator(control)).toBeNull();
    });

    it('should validate JCB cards when provider is specified', () => {
      const control = new FormControl('3530111333300000');
      const validator = isCreditCard({ provider: 'jcb' });
      expect(validator(control)).toBeNull();
    });

    it('should throw error for invalid provider', () => {
      const control = new FormControl('4111111111111111');
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validator = isCreditCard({ provider: 'invalid' as any });
        validator(control);
      }).toThrow('invalid is not a valid credit card provider.');
    });
  });

  describe('Card formatting', () => {
    it('should handle cards with spaces', () => {
      const control = new FormControl('4111 1111 1111 1111');
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });

    it('should handle cards with hyphens', () => {
      const control = new FormControl('4111-1111-1111-1111');
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });

    it('should handle cards with mixed formatting', () => {
      const control = new FormControl('4111 1111-1111 1111');
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });
  });

  describe('Luhn algorithm validation', () => {
    it('should fail Luhn check for card with valid format but wrong checksum', () => {
      const control = new FormControl('4111111111111112'); // Last digit changed
      const validator = isCreditCard();
      const result = validator(control);
      expect(result).toEqual({
        isCreditCard: {
          actualValue: '4111111111111112',
          luhnValid: false,
        },
      });
    });

    it('should pass Luhn check for valid cards', () => {
      const control = new FormControl('4111111111111111');
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('should return null for null value', () => {
      const control = new FormControl(null);
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });

    it('should return null for undefined value', () => {
      const control = new FormControl(undefined);
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });

    it('should return null for empty string', () => {
      const control = new FormControl('');
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });

    it('should handle non-string values', () => {
      const control = new FormControl(123456789);
      const validator = isCreditCard();
      expect(validator(control)).toBeNull();
    });
  });
});
