import { stringifyQueryParams } from './handleQueryParams';

describe('addQueryParams.test', () => {
  test('with one param', () => {
    const query = stringifyQueryParams({
      search: '12345',
    });
    expect(query).toBe('?search=12345');
  });
  test('with many params', () => {
    const query = stringifyQueryParams({
      search: '12345',
      param1: '54321',
      param2: 'param2',
    });
    expect(query).toBe('?search=12345&param1=54321&param2=param2');
  });
  test('with one of the params being undefined', () => {
    const query = stringifyQueryParams({
      search: '12345',
      param1: undefined,
    });
    expect(query).toBe('?search=12345');
  });
});
