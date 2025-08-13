import { ngxValid } from './ngx-valid';

describe('ngxValid', () => {
  it('should return the library name', () => {
    expect(ngxValid()).toBe('ngx-valid');
  });
});