/* eslint-disable camelcase */
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@apollo/client';

import getRandomImageFromDataset from '@utils/getRandomImageFromDataset';
import {useGetCurrentISO6391Language} from '@hooks';
import {GET_FAMOUS_DETAIL} from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

type UseFamousDetailProps = {
  id: number;
};

const useFamousDetail = ({id}: UseFamousDetailProps) => {
  const {currentISO6391Language} = useGetCurrentISO6391Language();

  const language =
    currentISO6391Language === SchemaTypes.ISO6391Language.SV
      ? SchemaTypes.ISO6391Language.EN
      : currentISO6391Language;

  const {data, error, loading} = useQuery<
    SchemaTypes.GetFamousDetail,
    SchemaTypes.GetFamousDetailVariables
  >(GET_FAMOUS_DETAIL, {
    variables: {
      language,
      id,
    },
    fetchPolicy: 'cache-first',
  });

  const {t} = useTranslation();

  const backgroundImage = useMemo((): string => {
    if (data && data.person) {
      const imageSelected = getRandomImageFromDataset(data.person.images, '');

      return imageSelected;
    }

    return '';
  }, [data]);

  return {
    famous: data?.person,
    isLoading: loading,
    hasError: !!error,
    backgroundImage,
    t,
  };
};

export default useFamousDetail;
