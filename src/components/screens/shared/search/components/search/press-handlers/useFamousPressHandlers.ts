import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseFamousPressHandlersProps = {
  navigation: SearchNavigationProp;
};

const useFamousPressHandlers = (props: UseFamousPressHandlersProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: SchemaTypes.SearchType.PERSON,
  });

  const handlePersistToRecentSearches = useCallback(
    async (item: SchemaTypes.SearchPerson_search_items_BasePerson) => {
      recentSearches.persistItemToRecentSearches({
        image: item.image,
        title: item.title,
        id: item.id,
      });
    },
    [recentSearches.persistItemToRecentSearches],
  );

  const handlePressFamousListItem = useCallback(
    (item: SchemaTypes.SearchPerson_search_items_BasePerson) => {
      handlePersistToRecentSearches(item);
      props.navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: item.image,
        name: item.title,
        id: item.id,
      });
    },
    [handlePersistToRecentSearches, props.navigation],
  );

  const handlePressRecentFamousSearchItem = useCallback(
    (person: Types.RecentSearchItem) => {
      props.navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: person.image,
        name: person.title,
        id: person.id,
      });
    },
    [props.navigation],
  );

  return {
    onPressRecentSearchItem: handlePressRecentFamousSearchItem,
    onPressListItem: handlePressFamousListItem,
  };
};

export default useFamousPressHandlers;
