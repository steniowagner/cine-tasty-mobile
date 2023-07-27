import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  SearchRouteProp,
  SearchNavigationProp,
} from '../../routes/route-params-types';
import {SearchBar} from './searchbar/SearchBar';
import {useSearch} from './useSearch';

export const Search = () => {
  const navigation = useNavigation<SearchNavigationProp>();
  const route = useRoute<SearchRouteProp>();

  const search = useSearch({
    searchByTextError: route.params.searchByTextError,
    paginationError: route.params.paginationError,
    searchType: route.params.searchType,
    queryId: route.params.queryId,
  });

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SearchBar
          onTypeSearchQuery={search.onTypeSearchQuery}
          onPressClose={navigation.goBack}
          placeholder={route.params.placeholder}
        />
      ),
    });
  }, [search.onTypeSearchQuery]);

  return <></>;
};

// import * as SchemaTypes from '@schema-types';

// import {SearchStackProps} from '../../routes/route-params-types';
// import {RecentSearches} from '../recent-searches/RecentSearches';
// import SearchFamous from './search-famous/SearchFamous';
// // @ts-ignore
// import SearchBar from './searchbar/SearchBar';
// import useSearch from './useSearch';

// export const Search = (props: SearchStackProps) => {
//   const search = useSearch({
//     searchByTextError: props.route.params.searchByTextError,
//     paginationError: props.route.params.paginationError,
//     searchType: props.route.params.searchType,
//     queryId: props.route.params.queryId,
//   });

//   useLayoutEffect(() => {
//     props.navigation.setOptions({
//       header: () => (
//         <SearchBar
//           onTypeSearchQuery={search.onTypeSearchQuery}
//           onPressClose={() => props.navigation.goBack()}
//           placeholder={props.route.params.placeholder}
//         />
//       ),
//     });
//   }, [
//     props.route.params.placeholder,
//     search.onTypeSearchQuery,
//     props.navigation,
//   ]);

//   return (
//     <>
//       {search.shouldShowRecentSearches && (
//         <RecentSearches searchType={props.route.params.searchType} />
//       )}
//       {props.route.params.searchType === SchemaTypes.SearchType.PERSON && (
//         <SearchFamous
//           dataset={
//             search.dataset as SchemaTypes.SearchPerson_search_items_BasePerson[]
//           }
//           onPressBottomReloadButton={search.onPressFooterReloadButton}
//           onPressTopReloadButton={search.onPressTopReloadButton}
//           hasPaginationError={search.hasPaginationError}
//           onEndReached={search.onEndReached}
//           isPaginating={search.isPaginating}
//           isLoading={search.isLoading}
//           error={search.error}
//         />
//       )}
//     </>
//   );
// };
