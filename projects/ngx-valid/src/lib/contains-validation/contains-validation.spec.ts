/* eslint-disable @typescript-eslint/no-explicit-any */
import { containsValidation } from './contains-validation';

describe('containsValidation', () => {
  describe('basic functionality', () => {
    it('should return true when string contains the element', () => {
      expect(containsValidation('hello world', 'world')).toBe(true);
      expect(containsValidation('hello world', 'hello')).toBe(true);
      expect(containsValidation('hello world', 'o w')).toBe(true);
    });

    it('should return false when string does not contain the element', () => {
      expect(containsValidation('hello world', 'xyz')).toBe(false);
      expect(containsValidation('hello world', 'HELLO')).toBe(false);
      expect(containsValidation('hello', 'hello world')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(containsValidation('', 'test')).toBe(false);
      expect(containsValidation('test', '')).toBe(true);
      expect(containsValidation('', '')).toBe(true);
    });
  });

  describe('case sensitivity', () => {
    it('should be case sensitive by default', () => {
      expect(containsValidation('Hello World', 'hello')).toBe(false);
      expect(containsValidation('Hello World', 'WORLD')).toBe(false);
    });

    it('should ignore case when ignoreCase is true', () => {
      expect(
        containsValidation('Hello World', 'hello', { ignoreCase: true })
      ).toBe(true);
      expect(
        containsValidation('Hello World', 'WORLD', { ignoreCase: true })
      ).toBe(true);
      expect(
        containsValidation('HELLO WORLD', 'hello world', { ignoreCase: true })
      ).toBe(true);
    });
  });

  describe('minimum occurrences', () => {
    it('should validate minimum occurrences', () => {
      expect(
        containsValidation('hello hello hello', 'hello', { minOccurrences: 3 })
      ).toBe(true);
      expect(
        containsValidation('hello hello', 'hello', { minOccurrences: 2 })
      ).toBe(true);
      expect(containsValidation('hello', 'hello', { minOccurrences: 1 })).toBe(
        true
      );
    });

    it('should return false when minimum occurrences not met', () => {
      expect(
        containsValidation('hello hello', 'hello', { minOccurrences: 3 })
      ).toBe(false);
      expect(containsValidation('hello', 'hello', { minOccurrences: 2 })).toBe(
        false
      );
      expect(containsValidation('test', 'hello', { minOccurrences: 1 })).toBe(
        false
      );
    });

    it('should handle minOccurrences less than 1', () => {
      expect(containsValidation('hello', 'hello', { minOccurrences: 0 })).toBe(
        false
      );
      expect(containsValidation('hello', 'hello', { minOccurrences: -1 })).toBe(
        false
      );
    });
  });

  describe('combined options', () => {
    it('should work with both ignoreCase and minOccurrences', () => {
      expect(
        containsValidation('Hello HELLO hello', 'hello', {
          ignoreCase: true,
          minOccurrences: 3,
        })
      ).toBe(true);

      expect(
        containsValidation('Hello HELLO', 'hello', {
          ignoreCase: true,
          minOccurrences: 3,
        })
      ).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle non-string inputs', () => {
      expect(containsValidation(null as any, 'test')).toBe(false);
      expect(containsValidation(undefined as any, 'test')).toBe(false);
      expect(containsValidation('test', null as any)).toBe(false);
      expect(containsValidation('test', undefined as any)).toBe(false);
      expect(containsValidation(123 as any, 'test')).toBe(false);
      expect(containsValidation('test', 123 as any)).toBe(false);
    });

    it('should handle special characters', () => {
      expect(containsValidation('test@example.com', '@')).toBe(true);
      expect(containsValidation('price: $100', '$')).toBe(true);
      expect(containsValidation('regex: /test/', '/')).toBe(true);
    });

    it('should handle unicode characters', () => {
      expect(containsValidation('café', 'é')).toBe(true);
      expect(containsValidation('🎉 party time 🎉', '🎉')).toBe(true);
      expect(containsValidation('привет мир', 'мир')).toBe(true);
    });
  });
});
