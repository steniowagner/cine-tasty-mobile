export const formatCurrency = (value?: number | null) => {
  if (!value) {
    return '-';
  }
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return currencyFormatter.format(value);
};
