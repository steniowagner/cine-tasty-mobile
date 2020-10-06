import { useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { SEARCH_MOVIES, SEARCH_TV_SHOWS } from 'components/screens/shared/search/queries';
import { TrendingMediaItemKey, SimplifiedMedia } from 'types';
import { SearchType } from 'types/schema';

import { HomeStackParams } from '../../routes/route-params-types';

export const SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF = 'translations:home:search:movie:queryByTextError';
export const SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF = 'translations:home:search:movie:paginationError';
export const SEARCH_MOVIE_PLACEHOLDER_I18N_REF = 'translations:home:search:movie:placeholder';

export const SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF = 'translations:home:search:tvShows:queryByTextError';
export const SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF = 'translations:home:search:tvShows:paginationError';
export const SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF = 'translations:home:search:tvShows:placeholder';

export const TRANSITIONING_DURATION = 1200;

type ViewAllProps = {
  sectionID: TrendingMediaItemKey;
  sectionItems: SimplifiedMedia[];
  viewAllTitle: string;
};

type State = {
  onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => void;
  onPressTop3LearnMore: (id: number) => void;
  onPressTrendingItem: (id: number) => void;
  onPressSearch: () => void;
};

type Props = {
  navigation: HomeScreenNavigationProp;
  isMoviesSelected: boolean;
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HOME'>;

const usePressMapping = ({ isMoviesSelected, navigation }: Props): State => {
  const {
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onPressSearch,
  } = useMemo(() => {
    const pressMapping = {
      [SearchType.MOVIE]: {
        onPressTop3LearnMore: (id: number) => console.warn('onPressTop3LearnMore [MOVIES] - ', id),
        onPressTrendingItem: (id: number) => console.warn('onPressTrendingItem [MOVIES]: ', id),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => {
          navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
            onPressItem: (id: number) => console.log('Movie - ', id),
            initialDataset: sectionItems,
            headerTitle: viewAllTitle,
            sectionKey: sectionID,
            isMovie: true,
          });
        },
        onPressSearch: () => {
          navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef: SEARCH_MOVIE_PAGINATION_ERROR_I18N_REF,
            i18nQueryByTextErrorRef: SEARCH_MOVIE_QUERY_BY_TEXT_ERROR_I18N_REF,
            i18nSearchBarPlaceholderRef: SEARCH_MOVIE_PLACEHOLDER_I18N_REF,
            searchType: SearchType.MOVIE,
            query: SEARCH_MOVIES,
          });
        },
      },
      [SearchType.TV]: {
        onPressTop3LearnMore: (id: number) => console.warn('onPressTop3LearnMore [TV-SHOW] - ', id),
        onPressTrendingItem: (id: number) => console.warn('onPressTrendingItem [TV-SHOW]: ', id),
        onPressViewAll: ({ sectionItems, viewAllTitle, sectionID }: ViewAllProps) => navigation.navigate('MEDIA_DETAILS_VIEW_ALL', {
          onPressItem: (id: number) => console.log('TVShow - ', id),
          initialDataset: sectionItems,
          headerTitle: viewAllTitle,
          sectionKey: sectionID,
          isMovie: false,
        }),
        onPressSearch: () => {
          navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef: SEARCH_TV_SHOWS_PAGINATION_ERROR_I18N_REF,
            i18nQueryByTextErrorRef: SEARCH_TV_SHOWS_QUERY_BY_TEXT_ERROR_I18N_REF,
            i18nSearchBarPlaceholderRef: SEARCH_TV_SHOWS_PLACEHOLDER_I18N_REF,
            searchType: SearchType.TV,
            query: SEARCH_TV_SHOWS,
          });
        },
      },
    };

    const mediaSelected = isMoviesSelected ? SearchType.MOVIE : SearchType.TV;

    return pressMapping[mediaSelected];
  }, [isMoviesSelected]);

  return {
    onPressTop3LearnMore,
    onPressTrendingItem,
    onPressViewAll,
    onPressSearch,
  };
};

export default usePressMapping;
