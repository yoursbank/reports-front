export const formatCurrency = (value: number): string => {
  return typeof value === 'number'
    ? `R$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    : '';
};
