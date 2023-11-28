export const formatDate = (language: string, date?: string | null) => {
  if (!date) {
    return '-';
  }
  const [year, month, day] = date.split('-');
  if (!year || !month || !day) {
    return '-';
  }
  if (language === 'en') {
    return `${year}-${month}-${day}`;
  }
  return `${day}/${month}/${year}`;
};
