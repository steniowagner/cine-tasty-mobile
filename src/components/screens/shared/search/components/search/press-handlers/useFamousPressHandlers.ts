import {useCallback} from 'react';

import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useRecentSearches from '../../recent-searches/useRecentSearches';

type UseFamousPressHandlersProps = {
  navigation: SearchNavigationProp;
};

const useFamousPressHandlers = ({navigation}: UseFamousPressHandlersProps) => {
  const {persistItemToRecentSearches} = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: SchemaTypes.SearchType.PERSON,
  });

  const handlePersistToRecentSearches = useCallback(
    async (item: SchemaTypes.SearchPerson_search_items_BasePerson) => {
      persistItemToRecentSearches({
        image: item.image,
        title: item.title,
        id: item.id,
      });
    },
    [persistItemToRecentSearches],
  );

  const onPressFamousListItem = useCallback(
    (item: SchemaTypes.SearchPerson_search_items_BasePerson) => {
      handlePersistToRecentSearches(item);
      navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: item.image,
        name: item.title,
        id: item.id,
      });
    },
    [handlePersistToRecentSearches, navigation],
  );

  const onPressRecentFamousSearchItem = useCallback(
    (person: Types.RecentSearchItem) => {
      navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: person.image,
        name: person.title,
        id: person.id,
      });
    },
    [navigation],
  );

  return {
    onPressRecentSearchItem: onPressRecentFamousSearchItem,
    onPressListItem: onPressFamousListItem,
  };
};

export default useFamousPressHandlers;
