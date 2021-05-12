/* eslint-disable camelcase */
import { useCallback } from 'react';

import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { FamousNavigationProp } from '../routes/route-params-types';

type UseFamousPressHandlersProps = {
  navigation: FamousNavigationProp;
};

const useFamousPressHandlers = (props: UseFamousPressHandlersProps) => {
  const onPressHeaderIconButton = useCallback(() => {
    props.navigation.navigate(Routes.Search.SEARCH, {
      i18nQueryByPaginationErrorRef: TRANSLATIONS.FAMOUS_QUERY_BY_PAGINATION_ERROR,
      i18nSearchBarPlaceholderRef: TRANSLATIONS.FAMOUS_SEARCHBAR_PLACEHOLDER,
      i18nQueryByTextErrorRef: TRANSLATIONS.FAMOUS_QUERY_BY_TEXT_ERROR,
      searchType: SchemaTypes.SearchType.PERSON,
      queryId: 'search_famous',
    });
  }, []);

  const onPressFamousListItem = useCallback(
    (famous: SchemaTypes.GetFamous_people_items) => {
      props.navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: famous.profilePath,
        name: famous.name,
        id: famous.id,
      });
    },
    [],
  );

  return {
    onPressHeaderIconButton,
    onPressFamousListItem,
  };
};

export default useFamousPressHandlers;
