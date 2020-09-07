import { useTranslation } from 'react-i18next';

type State = {
  t: (key: string) => string;
};

const useFamousDetail = (): State => {
  const { t } = useTranslation();

  return {
    t,
  };
};

export default useFamousDetail;
