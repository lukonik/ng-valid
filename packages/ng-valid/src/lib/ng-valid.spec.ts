import { ngValid } from './ng-valid';

describe('ngValid', () => {
  it('should return the library name', () => {
    expect(ngValid()).toBe('ng-valid');
  });
});