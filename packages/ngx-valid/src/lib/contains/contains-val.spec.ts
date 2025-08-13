import { FormControl } from '@angular/forms';
import { containsVal } from './contains-val';

describe('containsVal', () => {
  describe('basic functionality', () => {
    it('should return null when string contains the element', () => {
      const validator = containsVal('world');
      const control = new FormControl('hello world');
      expect(validator(control)).toBeNull();
    });

    it('should return validation error when string does not contain the element', () => {
      const validator = containsVal('xyz');
      const control = new FormControl('hello world');
      const result = validator(control);
      expect(result).toEqual({
        contains: {
          actualValue: 'hello world',
          requiredElement: 'xyz',
          ignoreCase: false,
          minOccurrences: 1
        }
      });
    });

    it('should return null for empty/null values', () => {
      const validator = containsVal('test');
      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should handle numeric value 0', () => {
      const validator = containsVal('0');
      const control = new FormControl(0);
      expect(validator(control)).toBeNull();
    });
  });

  describe('case sensitivity', () => {
    it('should be case sensitive by default', () => {
      const validator = containsVal('hello');
      const control = new FormControl('Hello World');
      const result = validator(control);
      expect(result).toEqual({
        contains: {
          actualValue: 'Hello World',
          requiredElement: 'hello',
          ignoreCase: false,
          minOccurrences: 1
        }
      });
    });

    it('should ignore case when ignoreCase is true', () => {
      const validator = containsVal('hello', { ignoreCase: true });
      const control = new FormControl('Hello World');
      expect(validator(control)).toBeNull();
    });
  });

  describe('minimum occurrences', () => {
    it('should validate minimum occurrences', () => {
      const validator = containsVal('hello', { minOccurrences: 2 });
      const validControl = new FormControl('hello hello hello');
      const invalidControl = new FormControl('hello world');
      
      expect(validator(validControl)).toBeNull();
      expect(validator(invalidControl)).toEqual({
        contains: {
          actualValue: 'hello world',
          requiredElement: 'hello',
          ignoreCase: false,
          minOccurrences: 2
        }
      });
    });

    it('should handle minOccurrences less than 1', () => {
      const validator = containsVal('hello', { minOccurrences: 0 });
      const control = new FormControl('hello');
      expect(validator(control)).toEqual({
        contains: {
          actualValue: 'hello',
          requiredElement: 'hello',
          ignoreCase: false,
          minOccurrences: 0
        }
      });
    });
  });

  describe('combined options', () => {
    it('should work with both ignoreCase and minOccurrences', () => {
      const validator = containsVal('hello', { 
        ignoreCase: true, 
        minOccurrences: 3 
      });
      
      const validControl = new FormControl('Hello HELLO hello');
      const invalidControl = new FormControl('Hello HELLO');
      
      expect(validator(validControl)).toBeNull();
      expect(validator(invalidControl)).toEqual({
        contains: {
          actualValue: 'Hello HELLO',
          requiredElement: 'hello',
          ignoreCase: true,
          minOccurrences: 3
        }
      });
    });
  });

  describe('edge cases', () => {
    it('should handle non-string inputs by converting to string', () => {
      const validator = containsVal('123');
      const control = new FormControl(123456);
      expect(validator(control)).toBeNull();
    });

    it('should handle null/undefined element or value types', () => {
      const validator = containsVal(null as any);
      const control = new FormControl('test');
      const result = validator(control);
      expect(result).toEqual({
        contains: {
          actualValue: 'test',
          requiredElement: null,
          ignoreCase: false,
          minOccurrences: 1
        }
      });
    });

    it('should handle empty element (should always pass)', () => {
      const validator = containsVal('');
      const control = new FormControl('test');
      expect(validator(control)).toBeNull();
    });

    it('should handle special characters', () => {
      const validator = containsVal('@');
      const control = new FormControl('test@example.com');
      expect(validator(control)).toBeNull();
    });

    it('should handle unicode characters', () => {
      const validator = containsVal('🎉');
      const control = new FormControl('🎉 party time 🎉');
      expect(validator(control)).toBeNull();
    });
  });
});