import { formatCurrency } from './format-currency';

describe('Utils/format-date', () => {
  it('should return correctly when "value" is "undefined"', () => {
    const result = formatCurrency();
    expect(result).toEqual('-');
  });

  it('should return correctly when "value" is "null"', () => {
    const result = formatCurrency(null);
    expect(result).toEqual('-');
  });

  it('should return correctly when "value" is "defined"', () => {
    const result = formatCurrency(10);
    expect(result).toEqual('$10.00');
  });
});
