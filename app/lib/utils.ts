export const formatCurrency = (amount: number) => {
  return (amount / 1000).toLocaleString('nb-NO', {
    style: 'currency',
    currency: 'NOK',
  });
};