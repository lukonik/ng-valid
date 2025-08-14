import { FormControl } from '@angular/forms';
import { isAfter } from './is-after';

describe('isAfter validator', () => {
  describe('basic functionality', () => {
    it('should return null for valid date after comparison', () => {
      const control = new FormControl('2024-12-31');
      const validator = isAfter({ comparisonDate: '2024-01-01' });

      expect(validator(control)).toBeNull();
    });

    it('should return validation error for date not after comparison', () => {
      const control = new FormControl('2024-01-01');
      const validator = isAfter({ comparisonDate: '2024-12-31' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: '2024-12-31',
          actualValue: '2024-01-01',
        },
      });
    });

    it('should handle empty values', () => {
      const validator = isAfter({ comparisonDate: '2024-01-01' });

      expect(validator(new FormControl(''))).toBeNull();
      expect(validator(new FormControl(null))).toBeNull();
      expect(validator(new FormControl(undefined))).toBeNull();
    });

    it('should use current date as default comparison', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const control = new FormControl(tomorrow.toISOString());
      const validator = isAfter();

      expect(validator(control)).toBeNull();
    });
  });

  describe('date object support', () => {
    it('should work with Date objects as comparison', () => {
      const control = new FormControl('2024-12-31');
      const validator = isAfter({ comparisonDate: new Date('2024-01-01') });

      expect(validator(control)).toBeNull();
    });

    it('should work with Date objects as input', () => {
      const control = new FormControl(new Date('2024-12-31'));
      const validator = isAfter({ comparisonDate: '2024-01-01' });

      expect(validator(control)).toBeNull();
    });

    it('should work with both Date objects', () => {
      const control = new FormControl(new Date('2024-12-31'));
      const validator = isAfter({ comparisonDate: new Date('2024-01-01') });

      expect(validator(control)).toBeNull();
    });
  });

  describe('time precision', () => {
    it('should handle dates with time components', () => {
      const control = new FormControl('2024-01-01T12:00:00Z');
      const validator = isAfter({ comparisonDate: '2024-01-01T11:00:00Z' });

      expect(validator(control)).toBeNull();
    });

    it('should fail when time makes date not after', () => {
      const control = new FormControl('2024-01-01T10:00:00Z');
      const validator = isAfter({ comparisonDate: '2024-01-01T11:00:00Z' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: '2024-01-01T11:00:00Z',
          actualValue: '2024-01-01T10:00:00Z',
        },
      });
    });

    it('should handle millisecond precision', () => {
      const control = new FormControl('2024-01-01T12:00:00.001Z');
      const validator = isAfter({ comparisonDate: '2024-01-01T12:00:00.000Z' });

      expect(validator(control)).toBeNull();
    });
  });

  describe('equal dates', () => {
    it('should fail for equal dates', () => {
      const control = new FormControl('2024-01-01');
      const validator = isAfter({ comparisonDate: '2024-01-01' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: '2024-01-01',
          actualValue: '2024-01-01',
        },
      });
    });

    it('should fail for equal dates with same time', () => {
      const control = new FormControl('2024-01-01T12:00:00Z');
      const validator = isAfter({ comparisonDate: '2024-01-01T12:00:00Z' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: '2024-01-01T12:00:00Z',
          actualValue: '2024-01-01T12:00:00Z',
        },
      });
    });
  });

  describe('invalid dates', () => {
    it('should handle invalid date strings', () => {
      const control = new FormControl('invalid-date');
      const validator = isAfter({ comparisonDate: '2024-01-01' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: '2024-01-01',
          actualValue: 'invalid-date',
        },
      });
    });

    it('should handle invalid comparison dates', () => {
      const control = new FormControl('2024-01-01');
      const validator = isAfter({ comparisonDate: 'invalid-date' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: 'invalid-date',
          actualValue: '2024-01-01',
        },
      });
    });

    it('should handle both invalid dates', () => {
      const control = new FormControl('invalid-date-1');
      const validator = isAfter({ comparisonDate: 'invalid-date-2' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: 'invalid-date-2',
          actualValue: 'invalid-date-1',
        },
      });
    });
  });

  describe('edge cases', () => {
    it('should handle leap year dates', () => {
      const control = new FormControl('2024-02-29');
      const validator = isAfter({ comparisonDate: '2024-02-28' });

      expect(validator(control)).toBeNull();
    });

    it('should handle year boundaries', () => {
      const control = new FormControl('2025-01-01');
      const validator = isAfter({ comparisonDate: '2024-12-31' });

      expect(validator(control)).toBeNull();
    });

    it('should handle different date formats', () => {
      const control = new FormControl('01/02/2024'); // MM/DD/YYYY
      const validator = isAfter({ comparisonDate: '2024-01-01' });

      expect(validator(control)).toBeNull();
    });

    it('should handle ISO 8601 formats', () => {
      const control = new FormControl('2024-01-02T00:00:00.000Z');
      const validator = isAfter({ comparisonDate: '2024-01-01T23:59:59.999Z' });

      expect(validator(control)).toBeNull();
    });

    it('should handle timezone differences', () => {
      // Both dates represent the same moment in time, but with timezone offset
      // 2024-01-01T01:00:00+01:00 is the same as 2024-01-01T00:00:00Z
      // So this should fail since they're equal, not after
      const control = new FormControl('2024-01-01T01:00:00+01:00');
      const validator = isAfter({ comparisonDate: '2024-01-01T00:00:00Z' });

      const result = validator(control);
      expect(result).toEqual({
        isAfter: {
          comparisonDate: '2024-01-01T00:00:00Z',
          actualValue: '2024-01-01T01:00:00+01:00',
        },
      });
    });
  });
});
