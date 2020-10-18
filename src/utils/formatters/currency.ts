const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (value: number): string => {
  if (!value) {
    return '-';
  }

  return currencyFormatter.format(value);
};
