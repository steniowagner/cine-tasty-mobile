import {
  FetchMoreQueryOptions,
  ApolloQueryResult,
  FetchMoreOptions,
} from 'apollo-client';
import {
  OperationVariables,
  QueryLazyOptions,
  LazyQueryResult,
} from '@apollo/client';

import { SupportedIcons } from '@components/common/svg-icon/getXML';
import * as SchemaTypes from '@schema-types';
import { Routes } from '@routes/routes';

import {
  SearchTVShow_search_items_BaseTVShow as SearchTVShowResult,
  SearchPerson_search_items_BasePerson as SearchPersonResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,

  TrendingTVShows_trendingTvShows_onTheAir_items as OnTheAirTVShows,
  TrendingTVShows_trendingTvShows_topRated_items as TopRatedTVShows,
  TrendingTVShows_trendingTvShows_popular_items as PopuarTVShows,

  TrendingMovies_trendingMovies_nowPlaying_items as NowPlayingMovies,
  TrendingMovies_trendingMovies_popular_items as PopularMovies,
  TrendingMovies_trendingMovies_topRated_items as TopRatedMovies,
  TrendingMovies_trendingMovies_upcoming_items as UpcomingMovies,

  TrendingTVShows_trendingTvShows as TrendingTVShows,
  TrendingMovies_trendingMovies as TrendingMovies,

  TVShowDetail_tvShow_cast as TVShowCast,
  TVShowDetail_tvShow_crew as TVShowCrew,

  MovieDetail_movie_cast as MovieCast,
  MovieDetail_movie_crew as MovieCrew,

  GetArticlesVariables,
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
  GetArticles,
} from './schema';

export type LocalStackRoute<T> = {
  id: T;
};

export type TabNavigatorItem = {
  id: Routes.Tabs.HOME | Routes.Tabs.FAMOUS | Routes.Tabs.QUIZ | Routes.Tabs.NEWS;
  inactiveIcon: SupportedIcons;
  activeIcon: SupportedIcons;
};

export type NewsFilterLanguage =
  | 'english'
  | 'arabic'
  | 'mandarim'
  | 'dutch'
  | 'french'
  | 'german'
  | 'hebrew'
  | 'italian'
  | 'norwegian'
  | 'portuguese'
  | 'russian'
  | 'sami'
  | 'spanish';

export type FetchMoreArticles = <K extends keyof GetArticlesVariables>(
  options: FetchMoreQueryOptions<GetArticlesVariables, K> &
    FetchMoreOptions<GetArticles, GetArticlesVariables>,
) => Promise<ApolloQueryResult<GetArticles>>;

export type QuizOption = 'DIFFICULTY' | 'CATEGORY' | 'TYPE';

export type QuestionOption<T> = {
  id: string;
  value: T;
};

export type QuizResult = {
  userAnswer: string;
  isCorrect: boolean;
  question: string;
  answer: string;
};

export type RecentSearchItem = {
  title: string;
  image: string;
  id: number;
}

export type SearchItem = SearchMovieResult | SearchPersonResult | SearchTVShowResult;

export type PaginatedQueryResult = {
  items: SearchItem[];
  hasMore: boolean;
};

export type SearchResult = {
  search: PaginatedQueryResult;
};

export type BaseSearchProps = {
  onPressHeaderReloadButton: () => void;
  onPressFooterReloadButton: () => void;
  hasPaginationError: boolean;
  onEndReached: () => void;
  isPaginating: boolean;
  errorMessage: string;
  isLoading: boolean;
}

export type QuizFilterOption = QuestionOption<QuestionDifficulty | QuestionCategory | QuestionType>;

export enum CustomizedModalChildrenType {
  TV_SHOW_READ_MORE_DETAILS = 'TV_SHOW_READ_MORE_DETAILS',
  TV_SHOW_EPISODE_DETAILS = 'TV_SHOW_EPISODE_DETAILS',
  MEDIA_FILTER = 'MEDIA_FILTER',
  LANGUAGE = 'LANGUAGE',
}

export type SimplifiedMedia = OnTheAirTVShows | TopRatedTVShows | PopuarTVShows | NowPlayingMovies | PopularMovies | TopRatedMovies | UpcomingMovies;

export type HomeTop3Item = {
  voteAverage: number;
  voteCount: number;
  genres: string[];
  image: string;
  title: string;
  id: number;
};

export type TrendingTVShowsKeys = keyof Omit<TrendingTVShows, '__typename'>;

export type TrendingMoviesKeys = keyof Omit<TrendingMovies, '__typename'>;

export type TrendingMediaItemKey = TrendingTVShowsKeys | TrendingMoviesKeys;

export type HomeSection = {
  id: TrendingMediaItemKey;
  data: SimplifiedMedia[];
  viewAllTitle: string;
  sectionTitle: string;
};

export type CrewDataset = (TVShowCrew | MovieCrew)[];

export type CastDataset = (TVShowCast | MovieCast)[];

export type Languages = 'en' | 'es' | 'ptBR';

export type ImageQualities = 'low' | 'medium' | 'high' | 'veryHigh';

export type DeviceScreenClassification = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type ImageType = 'backdrop' | 'poster' | 'still' | 'profile';

export type ImageQuailties = {
  poster: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'orginal';
  backdrop: 'w300' | 'w780' | 'w1280' | 'original';
  still: 'w92'| 'w185' | 'w300' | 'original';
  profile: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
}

export enum ThemeId {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
  SYSTEM = 'SYSTEM',
}

export type CineTastyQuery = 'search_movie' | 'search_tv' | 'search_famous' | 'get_famous' | 'now_playing_movies' | 'popular_movies' | 'top_rated_movies' | 'upcoming_movies' | 'airing_today_tv_shows' | 'on_the_air_tv_shows' | 'popular_tv_shows' | 'top_rated_tv_shows' | 'get_trending_movies' | 'get_trending_tv_shows' | 'get_articles' | 'get_quiz_questions' | 'get_famous_detail' | 'tv_show_seasons_detail' | 'get_tv_show_detail' | 'get_movie_detail';

export type FamousSearchItems = SchemaTypes.SearchPerson_search_items_BasePerson[];

export type FamousSearchPress = (
  item: SchemaTypes.SearchPerson_search_items_BasePerson,
) => void;

export type TVShowSearchItems = SchemaTypes.SearchTVShow_search_items_BaseTVShow[];

export type TVShowSearchPress = (
  item: SchemaTypes.SearchTVShow_search_items_BaseTVShow,
) => void;

export type MovieSearchItems = SchemaTypes.SearchMovie_search_items_BaseMovie[];

export type MovieSearchPress = (
  item: SchemaTypes.SearchMovie_search_items_BaseMovie,
) => void;

export type SearchFunction = (
  variables: QueryLazyOptions<{ input: SchemaTypes.SearchInput }>,
) => Promise<LazyQueryResult<SearchResult, OperationVariables>>;
