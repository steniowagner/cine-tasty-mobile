import {useMemo} from 'react';

import {Translations} from '@i18n/tags';
import {useTranslations} from '@hooks';

type UseHeaderInfoProps = {
  votesAverage: number;
  voteCount: number;
};

export const useHeaderInfo = (props: UseHeaderInfoProps) => {
  const translations = useTranslations();

  const texts = useMemo(
    () => ({
      votes: translations.translate(Translations.Tags.MEDIA_DETAIL_VOTES),
    }),
    [],
  );

  const shouldShowVotesContent = useMemo(
    () =>
      typeof props.votesAverage === 'number' &&
      typeof props.voteCount === 'number',
    [props.votesAverage, props.voteCount],
  );

  return {
    shouldShowVotesContent,
    texts,
  };
};
