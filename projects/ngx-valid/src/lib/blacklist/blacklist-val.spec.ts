import { blacklistVal } from './blacklist-val';
import { FormControl } from '@angular/forms';

describe('blacklistVal', () => {
  it('should be created', () => {
    const validator = blacklistVal('!@#');
    expect(validator).toBeDefined();
  });

  it('should always return null (transformer, not validator)', () => {
    const validator = blacklistVal('!@#');
    const control = new FormControl('test!@#');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should handle empty input', () => {
    const validator = blacklistVal('!@#');
    const control = new FormControl('');
    const result = validator(control);
    expect(result).toBeNull();
  });
});