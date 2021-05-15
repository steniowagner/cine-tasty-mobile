/* eslint-disable camelcase */
import { useMemo } from 'react';

import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';
import * as Types from '@local-types';

import useRecentSearches from '../recent-searches/useRecentSearches';
import { SearchNavigationProp } from '../../routes/route-params-types';

type UsePressHandlerProps = {
  searchType: SchemaTypes.SearchType;
  navigation: SearchNavigationProp;
};

const usePressHandler = (props: UsePressHandlerProps) => {
  const recentSearches = useRecentSearches({
    shouldSkipGetInitialRecentSearches: true,
    searchType: props.searchType,
  });

  const { onPressRecentSearchItem, onPressListItem } = useMemo(() => {
    const pressesHandlersMapping = {
      [SchemaTypes.SearchType.PERSON]: {
        onPressListItem: (item: SchemaTypes.SearchPerson_search_items_BasePerson) => {
          recentSearches.persistItemToRecentSearches({
            image: item.image,
            title: item.title,
            id: item.id,
          });

          props.navigation.navigate(Routes.Famous.DETAILS, {
            profileImage: item.image,
            name: item.title,
            id: item.id,
          });
        },
        onPressRecentSearchItem: (person: Types.RecentSearchItem) => {
          props.navigation.navigate(Routes.Famous.DETAILS, {
            profileImage: person.image,
            name: person.title,
            id: person.id,
          });
        },
      },
      [SchemaTypes.SearchType.MOVIE]: {
        onPressListItem: (movie: SchemaTypes.SearchMovie_search_items_BaseMovie) => {
          recentSearches.persistItemToRecentSearches({
            image: movie.posterPath,
            title: movie.title,
            id: movie.id,
          });

          props.navigation.navigate(Routes.Movie.DETAILS, {
            genreIds: movie.genreIds || [],
            voteAverage: movie.voteAverage,
            posterPath: movie.posterPath,
            voteCount: movie.voteCount,
            title: movie.title,
            id: movie.id,
          });
        },
        onPressRecentSearchItem: (movie: Types.RecentSearchItem) => {
          props.navigation.navigate(Routes.Movie.DETAILS, {
            posterPath: movie.image,
            title: movie.title,
            id: movie.id,
          });
        },
      },
      [SchemaTypes.SearchType.TV]: {
        onPressListItem: (tvShow: SchemaTypes.SearchTVShow_search_items_BaseTVShow) => {
          recentSearches.persistItemToRecentSearches({
            image: tvShow.posterPath,
            title: tvShow.title,
            id: tvShow.id,
          });

          props.navigation.navigate(Routes.TVShow.DETAILS, {
            genreIds: tvShow.genreIds || [],
            voteAverage: tvShow.voteAverage,
            posterPath: tvShow.posterPath,
            voteCount: tvShow.voteCount,
            title: tvShow.title,
            id: tvShow.id,
          });
        },
        onPressRecentSearchItem: (tvShow: Types.RecentSearchItem) => {
          props.navigation.navigate(Routes.TVShow.DETAILS, {
            posterPath: tvShow.image,
            title: tvShow.title,
            id: tvShow.id,
          });
        },
      },
    };

    return pressesHandlersMapping[props.searchType];
  }, [props.searchType]);

  return {
    onPressRecentSearchItem,
    onPressListItem,
  };
};

export default usePressHandler;
