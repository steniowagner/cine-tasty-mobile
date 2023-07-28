import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';

import {MediaListItem} from '@components';

import {SearchBar} from '../searchbar/SearchBar';
import {useSearchMedia} from './useSearchMedia';
import * as Styles from './SearchMedia.styles';

export const SearchMedia = () => {
  const searchMedia = useSearchMedia();

  useEffect(() => {
    searchMedia.navigation.setOptions({
      header: () => (
        <SearchBar
          onTypeSearchQuery={searchMedia.onTypeSearchQuery}
          onPressClose={searchMedia.onPressClose}
          placeholder={searchMedia.placeholder}
        />
      ),
    });
  }, [searchMedia.onTypeSearchQuery]);

  return (
    <FlatList
      onMomentumScrollEnd={() => {}}
      ItemSeparatorComponent={Styles.Separator}
      numColumns={3}
      contentContainerStyle={Styles.sheet.contentContainerStyle}
      columnWrapperStyle={Styles.sheet.columnWrapperStyle}
      renderItem={({item, index}) => (
        <MediaListItem
          layoutSize="medium"
          onPress={() => {}}
          voteAverage={5}
          voteCount={10}
          image="/wDWAA5QApz5L5BKfFaaj8HJCAQM.jpg"
          title="Velozes & Furiosos 10"
        />
      )}
      keyExtractor={item => item}
      data={Array(6).fill({})}
      pagingEnabled
    />
  );
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
