import { hello } from './hello';

describe('hello', () => {
  it('should return the string "hello"', () => {
    const result = hello();
    expect(result).toBe('hello');
  });
});
