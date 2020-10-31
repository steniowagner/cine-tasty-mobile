import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import getRandomImageFromDataset from 'utils/getRandomImageFromDataset';
import CONSTANTS from 'utils/constants';
import {
  GetFamousDetail_person as FamousDetail,
  GetFamousDetailVariables,
  GetFamousDetail,
} from 'types/schema';

const PROFILE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;
const PROFILE_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_SIZE_CODE}`;

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
        mediaType
        voteCount
        title
        id
      }
      tvCast {
        voteAverage
        posterPath
        mediaType
        voteCount
        name
        id
      }
    }
  }
`;

type BackgroundImage = {
  thumbnailURL: string;
  imageURL: string;
};

type State = {
  backgroundImage: BackgroundImage;
  t: (key: string) => string;
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

  const backgroundImage = useMemo((): BackgroundImage | undefined => {
    if (data && data.person) {
      const imageSelected = getRandomImageFromDataset(
        data.person.images,
        data.person.profilePath,
      );

      return {
        thumbnailURL: `${PROFILE_THUMBNAIL_URL}${imageSelected}`,
        imageURL: `${PROFILE_IMAGE_URL}${imageSelected}`,
      };
    }

    return undefined;
  }, [data]);

  const { t } = useTranslation();

  return {
    famous: data?.person,
    isLoading: loading,
    hasError: !!error,
    backgroundImage,
    t,
  };
};

export default useFamousDetail;
