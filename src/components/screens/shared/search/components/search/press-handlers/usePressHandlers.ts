import {useMemo} from 'react';

import * as SchemaTypes from '@schema-types';

import {SearchNavigationProp} from '../../../routes/route-params-types';
import useTVShowsPressHandlers from './useTVShowsPressHandlers';
import useFamousPressHandlers from './useFamousPressHandlers';
import useMoviesPressHandlers from './useMoviesPressHandlers';

type UsePressHandlerProps = {
  searchType: SchemaTypes.SearchType;
  navigation: SearchNavigationProp;
};

const usePressHandler = (props: UsePressHandlerProps) => {
  const tvShowsPressHandlers = useTVShowsPressHandlers({
    navigation: props.navigation,
  });
  const famousPressHandlers = useFamousPressHandlers({
    navigation: props.navigation,
  });
  const moviesPressHandlers = useMoviesPressHandlers({
    navigation: props.navigation,
  });

  const pressMapping = useMemo(() => {
    const pressesHandlersMapping = {
      [SchemaTypes.SearchType.PERSON]: {
        onPressRecentSearchItem: famousPressHandlers.onPressRecentSearchItem,
        onPressListItem: famousPressHandlers.onPressListItem,
      },
      [SchemaTypes.SearchType.MOVIE]: {
        onPressListItem: moviesPressHandlers.onPressListItem,
        onPressRecentSearchItem: moviesPressHandlers.onPressRecentSearchItem,
      },
      [SchemaTypes.SearchType.TV]: {
        onPressListItem: tvShowsPressHandlers.onPressListItem,
        onPressRecentSearchItem: tvShowsPressHandlers.onPressRecentSearchItem,
      },
    };

    return pressesHandlersMapping[props.searchType];
  }, [
    tvShowsPressHandlers,
    famousPressHandlers,
    moviesPressHandlers,
    props.searchType,
  ]);

  return {
    onPressRecentSearchItem: pressMapping.onPressRecentSearchItem,
    onPressListItem: pressMapping.onPressListItem,
  };
};

export default usePressHandler;
