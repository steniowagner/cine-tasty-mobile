/* eslint-disable camelcase */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import getRandomImageFromDataset from '@utils/getRandomImageFromDataset';
import { GET_FAMOUS_DETAIL } from '@graphql/queries';
import * as SchemaTypes from '@schema-types';

type UseFamousDetailProps = {
  id: number;
};

const useFamousDetail = (props: UseFamousDetailProps) => {
  const query = useQuery<
    SchemaTypes.GetFamousDetail,
    SchemaTypes.GetFamousDetailVariables
  >(GET_FAMOUS_DETAIL, {
    variables: {
      id: props.id,
    },
    fetchPolicy: 'cache-first',
  });

  const { t } = useTranslation();

  const backgroundImage = useMemo((): string => {
    if (query.data && query.data.person) {
      const imageSelected = getRandomImageFromDataset(query.data.person.images, '');

      return imageSelected;
    }

    return '';
  }, [query.data]);

  return {
    famous: query.data?.person,
    isLoading: query.loading,
    hasError: !!query.error,
    backgroundImage,
    t,
  };
};

export default useFamousDetail;
