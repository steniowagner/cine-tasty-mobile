/* eslint-disable camelcase */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import getRandomImageFromDataset from '@utils/getRandomImageFromDataset';
import { GET_FAMOUS_DETAIL } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

type State = {
  t: (key: string) => string;
  backgroundImage: string;
  famous: SchemaTypes.GetFamousDetail_person;
  isLoading: boolean;
  hasError: boolean;
};

type Props = {
  id: number;
};

const useFamousDetail = ({ id }: Props): State => {
  const { data, error, loading } = useQuery<
    SchemaTypes.GetFamousDetail,
    SchemaTypes.GetFamousDetailVariables
  >(GET_FAMOUS_DETAIL, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-first',
  });

  const { t } = useTranslation();

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
