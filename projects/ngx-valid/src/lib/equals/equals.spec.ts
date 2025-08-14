import { FormControl } from '@angular/forms';
import { equals } from './equals';

describe('equals validator', () => {
  describe('basic functionality', () => {
    it('should return null for valid string equal to comparison', () => {
      const control = new FormControl('hello');
      const validator = equals('hello');

      expect(validator(control)).toBeNull();
    });

    it('should return validation error for string not equal to comparison', () => {
      const control = new FormControl('hello');
      const validator = equals('world');

      const result = validator(control);
      expect(result).toEqual({
        equals: {
          requiredValue: 'world',
          actualValue: 'hello',
        },
      });
    });

    it('should handle empty values', () => {
      const validator = equals('test');

      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should convert non-string values to string', () => {
      const control = new FormControl(123);
      const validator = equals('123');

      expect(validator(control)).toBeNull();
    });

    it('should fail for non-string that does not match after conversion', () => {
      const control = new FormControl(123);
      const validator = equals('456');

      const result = validator(control);
      expect(result).toEqual({
        equals: {
          requiredValue: '456',
          actualValue: '123',
        },
      });
    });
  });

  describe('strict equality', () => {
    it('should be case sensitive', () => {
      const control = new FormControl('Hello');
      const validator = equals('hello');

      const result = validator(control);
      expect(result).toEqual({
        equals: {
          requiredValue: 'hello',
          actualValue: 'Hello',
        },
      });
    });

    it('should match case sensitive strings', () => {
      const control = new FormControl('Hello');
      const validator = equals('Hello');

      expect(validator(control)).toBeNull();
    });

    it('should handle exact whitespace matching', () => {
      const control = new FormControl(' hello ');
      const validator = equals('hello');

      const result = validator(control);
      expect(result).toEqual({
        equals: {
          requiredValue: 'hello',
          actualValue: ' hello ',
        },
      });
    });

    it('should match strings with whitespace exactly', () => {
      const control = new FormControl(' hello ');
      const validator = equals(' hello ');

      expect(validator(control)).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle empty string comparison', () => {
      const control = new FormControl('');
      const validator = equals('test');

      // Empty values are not validated (return null)
      expect(validator(control)).toBeNull();
    });

    it('should handle comparison with empty string', () => {
      const control = new FormControl('test');
      const validator = equals('');

      const result = validator(control);
      expect(result).toEqual({
        equals: {
          requiredValue: '',
          actualValue: 'test',
        },
      });
    });

    it('should handle special characters', () => {
      const control = new FormControl('test@email.com');
      const validator = equals('test@email.com');

      expect(validator(control)).toBeNull();
    });

    it('should handle unicode characters', () => {
      const control = new FormControl('café');
      const validator = equals('café');

      expect(validator(control)).toBeNull();
    });

    it('should handle numbers as strings', () => {
      const control = new FormControl('123.45');
      const validator = equals('123.45');

      expect(validator(control)).toBeNull();
    });

    it('should handle boolean conversion to string', () => {
      const control = new FormControl(true);
      const validator = equals('true');

      expect(validator(control)).toBeNull();
    });

    it('should handle null comparison after string conversion', () => {
      const control = new FormControl('null');
      const validator = equals('null');

      expect(validator(control)).toBeNull();
    });
  });
});
