import { useTranslation } from 'react-i18next';

const useLanguage = () => {
  const x = useTranslation();
  console.log(x);
};

export default useLanguage;
