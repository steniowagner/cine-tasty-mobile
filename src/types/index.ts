import {
  FetchMoreQueryOptions,
  ApolloQueryResult,
  FetchMoreOptions,
} from 'apollo-client';

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

  Movie_movie_cast as MovieCast,
  Movie_movie_crew as MovieCrew,

  GetArticlesVariables,
  QuestionDifficulty,
  QuestionCategory,
  QuestionType,
  GetArticles,
} from './schema';

export enum ThemeID {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export type LocalStackRoute<T> = {
  id: T;
};

export type TabNavigatorItem = {
  inactiveIcon: string;
  activeIcon: string;
  id: string;
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
