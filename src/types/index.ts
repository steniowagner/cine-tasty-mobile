import {
  FetchMoreQueryOptions,
  ApolloQueryResult,
  FetchMoreOptions,
} from 'apollo-client';

import { FamousStackRoutes } from '@src/components/screens/famous/routes/route-params-types';
import { HomeStackRoutes } from '@src/components/screens/home/routes/route-params-types';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SchemaTypes from '@schema-types';
import { Icons } from '@components';
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
  GetArticles,
} from './schema';

export type LocalStackRoute<T> = {
  id: T;
};

export type TabNavigatorItem = {
  id: Routes.Tabs.HOME | Routes.Tabs.FAMOUS | Routes.Tabs.QUIZ | Routes.Tabs.NEWS;
  inactiveIcon: Icons;
  activeIcon: Icons;
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
  | 'finnish'
  | 'spanish';

export type FetchMoreArticles = <K extends keyof GetArticlesVariables>(
  options: FetchMoreQueryOptions<GetArticlesVariables, K> &
    FetchMoreOptions<GetArticles, GetArticlesVariables>,
) => Promise<ApolloQueryResult<GetArticles>>;

export type QuizOption = 'difficulty' | 'category' | 'type';

export type QuizFilterOption = QuestionDifficulty | QuestionCategory | QuestionType

export type QuestionDifficulty = {
  id: 'mixed' | 'easy' | 'medium' | 'hard';
  value: SchemaTypes.QuestionDifficulty;
  option: 'difficulty';
};

export type QuestionCategory = {
  value: SchemaTypes.QuestionCategory;
  id: 'mixed' | 'movie' | 'tv';
  option: 'category';
};

export type QuestionType = {
  id: 'mixed' | 'multiple' | 'boolean';
  value: SchemaTypes.QuestionType;
  option: 'type';
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

export type SimplifiedMedia = OnTheAirTVShows | TopRatedTVShows | PopuarTVShows | NowPlayingMovies | PopularMovies | TopRatedMovies | UpcomingMovies;

export type HomeTop3Item = (OnTheAirTVShows | NowPlayingMovies) & { onPress: () => void };

export type TrendingTVShowsKeys = keyof Omit<TrendingTVShows, '__typename'>;

export type TrendingMoviesKeys = keyof Omit<TrendingMovies, '__typename'>;

export type TrendingMediaItemKey = TrendingTVShowsKeys | TrendingMoviesKeys;

export type HomeSection = {
  onPressViewAll: () => void
  onPressItem: (item: SimplifiedMedia) => void
  id: TrendingMediaItemKey;
  data: SimplifiedMedia[];
  sectionTitle: string;
};

export type PressViewAllParams = {
  id: TrendingMediaItemKey;
  data: SimplifiedMedia[];
  viewAllTitle: string;
  isMovie: boolean;
};

export type CrewDataset = (TVShowCrew | MovieCrew)[];

export type CastDataset = (TVShowCast | MovieCast)[];

export type Languages = 'en' | 'es' | 'ptBR';

export type ImageQualities = 'low' | 'medium' | 'high' | 'veryHigh';

export type DeviceScreenClassification = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export type ImageType = 'backdrop' | 'poster' | 'still' | 'profile';

export type MappingImageTypeToImageSize = {
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

export type Famous = {
  profileImage: string | null;
  name: string | null;
  id: number | null;
};

export type ResentSearchItem = {
  image: string;
  title: string;
  id: number;
};

type FamousStackCommonRoutes =
  | Routes.Famous.IMAGES_GALLERY
  | Routes.Famous.TV_SHOW_DETAILS
  | Routes.Famous.TV_SHOW_SEASONS
  | Routes.Famous.MOVIE_DETAILS
  | Routes.Famous.DETAILS
  | Routes.Famous.MEDIA_REVIEWS
  | Routes.Famous.SEARCH;

type FamousStackCommonParams = Pick<
  FamousStackRoutes,
  FamousStackCommonRoutes
>;

type HomeStackCommonRoutes =
| Routes.Home.IMAGES_GALLERY
| Routes.Home.TV_SHOW_DETAILS
| Routes.Home.TV_SHOW_SEASONS
| Routes.Home.MOVIE_DETAILS
| Routes.Home.FAMOUS_DETAILS
| Routes.Home.MEDIA_REVIEWS
| Routes.Home.SEARCH;

type HomeStackCommonParams = Pick<HomeStackRoutes, HomeStackCommonRoutes>;

export type SharedScreensNavigation = StackNavigationProp<
  FamousStackCommonParams & HomeStackCommonParams,
  HomeStackCommonRoutes | FamousStackCommonRoutes
>;
