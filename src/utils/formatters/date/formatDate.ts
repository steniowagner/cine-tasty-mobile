import {getI18n} from 'react-i18next';

export const formatDate = (date: string) => {
  if (!date) {
    return '-';
  }

  const [year, month, day] = date.split('-');

  const {language} = getI18n();

  if (language === 'en') {
    return `${year}-${month}-${day}`;
  }

  return `${day}/${month}/${year}`;
};
