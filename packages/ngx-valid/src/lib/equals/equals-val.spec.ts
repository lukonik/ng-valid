import { FormControl } from '@angular/forms';
import { equalsVal } from './equals-val';

describe('equalsVal', () => {
  describe('basic functionality', () => {
    it('should return null when values are equal', () => {
      const validator = equalsVal('test');
      const control = new FormControl('test');
      expect(validator(control)).toBeNull();
    });

    it('should return validation error when values are not equal', () => {
      const validator = equalsVal('expected');
      const control = new FormControl('actual');
      const result = validator(control);
      expect(result).toEqual({
        equals: {
          actualValue: 'actual',
          expectedValue: 'expected',
          actualValueAsString: 'actual'
        }
      });
    });

    it('should return null for empty/null values', () => {
      const validator = equalsVal('test');
      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should handle numeric value 0', () => {
      const validator = equalsVal('0');
      const control = new FormControl(0);
      expect(validator(control)).toBeNull();
    });

    it('should handle boolean value false', () => {
      const validator = equalsVal('false');
      const control = new FormControl(false);
      expect(validator(control)).toBeNull();
    });
  });

  describe('type conversion and strict equality', () => {
    it('should convert control value to string for comparison', () => {
      const validator = equalsVal('123');
      const numberControl = new FormControl(123);
      expect(validator(numberControl)).toBeNull();
    });

    it('should be strict about equality after string conversion', () => {
      const validator = equalsVal('true');
      const booleanControl = new FormControl(true);
      expect(validator(booleanControl)).toBeNull();
    });

    it('should distinguish between similar but different values', () => {
      const validator = equalsVal('0');
      const falseControl = new FormControl(false);
      const result = validator(falseControl);
      expect(result).toEqual({
        equals: {
          actualValue: false,
          expectedValue: '0',
          actualValueAsString: 'false'
        }
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty string comparison', () => {
      const validator = equalsVal('');
      const control = new FormControl('');
      expect(validator(control)).toBeNull();
    });

    it('should handle whitespace differences', () => {
      const validator = equalsVal('test');
      const control = new FormControl(' test ');
      const result = validator(control);
      expect(result).toEqual({
        equals: {
          actualValue: ' test ',
          expectedValue: 'test',
          actualValueAsString: ' test '
        }
      });
    });

    it('should handle case sensitivity', () => {
      const validator = equalsVal('Test');
      const control = new FormControl('test');
      const result = validator(control);
      expect(result).toEqual({
        equals: {
          actualValue: 'test',
          expectedValue: 'Test',
          actualValueAsString: 'test'
        }
      });
    });

    it('should handle special characters', () => {
      const validator = equalsVal('test@example.com');
      const control = new FormControl('test@example.com');
      expect(validator(control)).toBeNull();
    });

    it('should handle unicode characters', () => {
      const validator = equalsVal('café');
      const control = new FormControl('café');
      expect(validator(control)).toBeNull();
    });

    it('should handle null and undefined comparisons', () => {
      const nullValidator = equalsVal(null);
      const undefinedValidator = equalsVal(undefined);
      
      const control = new FormControl('test');
      
      expect(nullValidator(control)).toEqual({
        equals: {
          actualValue: 'test',
          expectedValue: null,
          actualValueAsString: 'test'
        }
      });

      expect(undefinedValidator(control)).toEqual({
        equals: {
          actualValue: 'test',
          expectedValue: undefined,
          actualValueAsString: 'test'
        }
      });
    });
  });

  describe('real-world scenarios', () => {
    it('should work for password confirmation', () => {
      const password = 'mySecurePassword123';
      const validator = equalsVal(password);
      
      const matchingControl = new FormControl(password);
      const nonMatchingControl = new FormControl('differentPassword');
      
      expect(validator(matchingControl)).toBeNull();
      expect(validator(nonMatchingControl)).toEqual({
        equals: {
          actualValue: 'differentPassword',
          expectedValue: password,
          actualValueAsString: 'differentPassword'
        }
      });
    });

    it('should work for email confirmation', () => {
      const email = 'user@example.com';
      const validator = equalsVal(email);
      
      const matchingControl = new FormControl(email);
      const typoControl = new FormControl('user@example.co');
      
      expect(validator(matchingControl)).toBeNull();
      expect(validator(typoControl)).toEqual({
        equals: {
          actualValue: 'user@example.co',
          expectedValue: email,
          actualValueAsString: 'user@example.co'
        }
      });
    });
  });
});