import { FormControl } from '@angular/forms';
import { contains } from './contains';

describe('contains validator', () => {
  describe('basic functionality', () => {
    it('should return null for valid string containing element', () => {
      const control = new FormControl('hello world');
      const validator = contains('world');

      expect(validator(control)).toBeNull();
    });

    it('should return validation error for string not containing element', () => {
      const control = new FormControl('hello world');
      const validator = contains('foo');

      const result = validator(control);
      expect(result).toEqual({
        contains: {
          requiredElement: 'foo',
          actualValue: 'hello world',
          minOccurrences: 1,
          actualOccurrences: 0,
        },
      });
    });

    it('should handle empty values', () => {
      const validator = contains('test');

      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should convert non-string values to string', () => {
      const control = new FormControl(12345);
      const validator = contains('23');

      expect(validator(control)).toBeNull();
    });
  });

  describe('case sensitivity', () => {
    it('should be case sensitive by default', () => {
      const control = new FormControl('Hello World');
      const validator = contains('world');

      const result = validator(control);
      expect(result).toEqual({
        contains: {
          requiredElement: 'world',
          actualValue: 'Hello World',
          minOccurrences: 1,
          actualOccurrences: 0,
        },
      });
    });

    it('should ignore case when ignoreCase is true', () => {
      const control = new FormControl('Hello World');
      const validator = contains('WORLD', { ignoreCase: true });

      expect(validator(control)).toBeNull();
    });

    it('should handle case insensitive search with mixed case element', () => {
      const control = new FormControl('hello WORLD test');
      const validator = contains('WoRlD', { ignoreCase: true });

      expect(validator(control)).toBeNull();
    });
  });

  describe('minimum occurrences', () => {
    it('should validate minimum occurrences', () => {
      const control = new FormControl('test test test');
      const validator = contains('test', { minOccurrences: 3 });

      expect(validator(control)).toBeNull();
    });

    it('should fail when occurrences are below minimum', () => {
      const control = new FormControl('test test');
      const validator = contains('test', { minOccurrences: 3 });

      const result = validator(control);
      expect(result).toEqual({
        contains: {
          requiredElement: 'test',
          actualValue: 'test test',
          minOccurrences: 3,
          actualOccurrences: 2,
        },
      });
    });

    it('should count overlapping occurrences correctly', () => {
      const control = new FormControl('aaa');
      const validator = contains('aa', { minOccurrences: 2 });

      expect(validator(control)).toBeNull();
    });

    it('should handle zero occurrences requirement', () => {
      const control = new FormControl('hello world');
      const validator = contains('test', { minOccurrences: 0 });

      expect(validator(control)).toBeNull();
    });
  });

  describe('combined options', () => {
    it('should work with both ignoreCase and minOccurrences', () => {
      const control = new FormControl('Test TEST test');
      const validator = contains('TEST', {
        ignoreCase: true,
        minOccurrences: 3,
      });

      expect(validator(control)).toBeNull();
    });

    it('should fail with combined options when criteria not met', () => {
      const control = new FormControl('Test test');
      const validator = contains('TEST', {
        ignoreCase: true,
        minOccurrences: 3,
      });

      const result = validator(control);
      expect(result).toEqual({
        contains: {
          requiredElement: 'TEST',
          actualValue: 'Test test',
          minOccurrences: 3,
          actualOccurrences: 2,
        },
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty element string', () => {
      const control = new FormControl('test');
      const validator = contains('');

      // Empty string is contained in any string multiple times
      expect(validator(control)).toBeNull();
    });

    it('should handle single character searches', () => {
      const control = new FormControl('abcdef');
      const validator = contains('c');

      expect(validator(control)).toBeNull();
    });

    it('should handle special characters', () => {
      const control = new FormControl('test@email.com');
      const validator = contains('@');

      expect(validator(control)).toBeNull();
    });

    it('should handle unicode characters', () => {
      const control = new FormControl('café µ-test');
      const validator = contains('µ');

      expect(validator(control)).toBeNull();
    });

    it('should handle whitespace in element', () => {
      const control = new FormControl('hello world test');
      const validator = contains(' world ');

      expect(validator(control)).toBeNull();
    });
  });
});
