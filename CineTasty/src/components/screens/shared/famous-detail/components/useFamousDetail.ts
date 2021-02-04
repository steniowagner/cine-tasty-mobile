import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import getRandomImageFromDataset from 'utils/getRandomImageFromDataset';
import {
  GetFamousDetail_person as FamousDetail,
  GetFamousDetailVariables,
  GetFamousDetail,
} from 'types/schema';

export const GET_FAMOUS_DETAIL = gql`
  query GetFamousDetail($id: Int!, $language: ISO6391Language) {
    person(id: $id, language: $language) {
      knownForDepartment
      placeOfBirth
      biography
      birthday
      deathday
      images
      moviesCast {
        voteAverage
        posterPath
        voteCount
        title
        id
      }
      tvCast {
        voteAverage
        posterPath
        voteCount
        name
        id
      }
    }
  }
`;

type State = {
  t: (key: string) => string;
  backgroundImage: string;
  famous: FamousDetail;
  isLoading: boolean;
  hasError: boolean;
};

type Props = {
  id: number;
};

const useFamousDetail = ({ id }: Props): State => {
  const { data, error, loading } = useQuery<GetFamousDetail, GetFamousDetailVariables>(
    GET_FAMOUS_DETAIL,
    {
      variables: {
        id,
      },
      fetchPolicy: 'cache-first',
    },
  );

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
