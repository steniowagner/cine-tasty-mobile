import {useCallback, useMemo} from 'react';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';

import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseSearchFamous = {
  dataset: SchemaTypes.SearchPerson_search_items_BasePerson[];
};

const useSearchFamous = (props: UseSearchFamous) => {
  const recentSearches = useRecentSearches({
    searchType: SchemaTypes.SearchType.PERSON,
    shouldSkipGetInitialRecentSearches: true,
  });

  const persistToRecentSearches = useCallback(async (famous: Types.Famous) => {
    await recentSearches.add({
      image: famous.profileImage,
      title: famous.name,
      id: famous.id,
    });
  }, []);

  const famous = useMemo(
    () =>
      props.dataset.map(item => ({
        profileImage: item.image,
        name: item.title,
        id: item.id,
      })),
    [props.dataset],
  );

  return {
    persistToRecentSearches,
    famous,
  };
};

export default useSearchFamous;
