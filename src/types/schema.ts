/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FamousDetails
// ====================================================

export interface FamousDetails_famous_cast_movies {
  __typename: "FamousCastMovie";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number;
}

export interface FamousDetails_famous_cast_tvShows {
  __typename: "FamousCastTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number;
}

export interface FamousDetails_famous_cast {
  __typename: "FamousCast";
  movies: FamousDetails_famous_cast_movies[];
  tvShows: FamousDetails_famous_cast_tvShows[];
}

export interface FamousDetails_famous {
  __typename: "Famous";
  knownForDepartment: string | null;
  placeOfBirth: string | null;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  images: string[];
  cast: FamousDetails_famous_cast;
}

export interface FamousDetails {
  famous: FamousDetails_famous;
}

export interface FamousDetailsVariables {
  id: number;
  language?: ISO6391Language | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TVShowDetails
// ====================================================

export interface TVShowDetails_tvShow_createdBy {
  __typename: "CreatedBy";
  profilePath: string | null;
  name: string | null;
  id: number;
}

export interface TVShowDetails_tvShow_videos_thumbnail {
  __typename: "Thumbnail";
  /**
   * 120x90
   */
  extraSmall: string | null;
}

export interface TVShowDetails_tvShow_videos {
  __typename: "MediaVideo";
  thumbnail: TVShowDetails_tvShow_videos_thumbnail | null;
  key: string | null;
  id: string | null;
}

export interface TVShowDetails_tvShow_similar {
  __typename: "SimilarTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number;
}

export interface TVShowDetails_tvShow {
  __typename: "TVShow";
  genres: string[];
  voteAverage: number | null;
  voteCount: number | null;
  images: string[];
  createdBy: TVShowDetails_tvShow_createdBy[];
  episodeRunTime: number[];
  firstAirDate: string | null;
  lastAirDate: string | null;
  title: string | null;
  id: number;
  originalLanguage: string | null;
  originalName: string | null;
  originCountry: string[];
  overview: string | null;
  videos: TVShowDetails_tvShow_videos[];
  similar: TVShowDetails_tvShow_similar[];
  numberOfEpisodes: number | null;
  numberOfSeasons: number | null;
}

export interface TVShowDetails {
  tvShow: TVShowDetails_tvShow;
}

export interface TVShowDetailsVariables {
  id: number;
  language?: ISO6391Language | null;
  includeVoteAverage: boolean;
  includeGenres: boolean;
  includeVoteCount: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchFamous
// ====================================================

export interface SearchFamous_search_items {
  __typename: "SearchFamousItem";
  image: string | null;
  title: string | null;
  id: number | null;
}

export interface SearchFamous_search {
  __typename: "SearchFamousResult";
  items: SearchFamous_search_items[];
  hasMore: boolean;
}

export interface SearchFamous {
  search: SearchFamous_search;
}

export interface SearchFamousVariables {
  input: SearchInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchMovies
// ====================================================

export interface SearchMovies_search_items {
  __typename: "SearchMovieItem";
  image: string | null;
  title: string | null;
  id: number;
}

export interface SearchMovies_search {
  __typename: "SearchMoviesResult";
  items: SearchMovies_search_items[];
  hasMore: boolean;
}

export interface SearchMovies {
  search: SearchMovies_search;
}

export interface SearchMoviesVariables {
  input: SearchInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTVShows
// ====================================================

export interface SearchTVShows_search_items {
  __typename: "SearchTVShowItem";
  image: string | null;
  title: string | null;
  id: number;
}

export interface SearchTVShows_search {
  __typename: "SearchTVShowsResult";
  hasMore: boolean;
  items: SearchTVShows_search_items[];
}

export interface SearchTVShows {
  search: SearchTVShows_search;
}

export interface SearchTVShowsVariables {
  input: SearchInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryTrendingFamous
// ====================================================

export interface QueryTrendingFamous_trendingFamous_items {
  __typename: "TrendingFamousItem";
  profilePath: string | null;
  name: string | null;
  id: number | null;
}

export interface QueryTrendingFamous_trendingFamous {
  __typename: "TrendingFamousResult";
  hasMore: boolean;
  items: QueryTrendingFamous_trendingFamous_items[];
}

export interface QueryTrendingFamous {
  trendingFamous: QueryTrendingFamous_trendingFamous;
}

export interface QueryTrendingFamousVariables {
  page: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryNews
// ====================================================

export interface QueryNews_news_items {
  __typename: "NewsArticle";
  url: string | null;
  title: string | null;
  source: string | null;
  publishedAt: string | null;
  image: string | null;
  id: string | null;
  description: string | null;
}

export interface QueryNews_news {
  __typename: "NewsResult";
  items: QueryNews_news_items[];
  hasMore: boolean;
}

export interface QueryNews {
  news: QueryNews_news;
}

export interface QueryNewsVariables {
  page: number;
  language: NewsLanguage;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryQuestions
// ====================================================

export interface QueryQuestions_quiz {
  __typename: "QuizQuestion";
  correctAnswer: string;
  category: string;
  question: string;
  options: string[];
  type: string;
}

export interface QueryQuestions {
  quiz: QueryQuestions_quiz[];
}

export interface QueryQuestionsVariables {
  input: QuizInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ISO6391Language {
  en = "en",
  es = "es",
  pt = "pt",
}

export enum NewsLanguage {
  AR = "AR",
  DE = "DE",
  EN = "EN",
  ES = "ES",
  FR = "FR",
  HE = "HE",
  IT = "IT",
  NL = "NL",
  NO = "NO",
  PT = "PT",
  RU = "RU",
  SE = "SE",
  ZH = "ZH",
}

export enum QuizQuestionCategory {
  MIXED = "MIXED",
  MOVIE = "MOVIE",
  TV = "TV",
}

export enum QuizQuestionDifficulty {
  EASY = "EASY",
  HARD = "HARD",
  MEDIUM = "MEDIUM",
  MIXED = "MIXED",
}

export enum QuizQuestionType {
  BOOLEAN = "BOOLEAN",
  MIXED = "MIXED",
  MULTIPLE = "MULTIPLE",
}

export interface QuizInput {
  difficulty: QuizQuestionDifficulty;
  type: QuizQuestionType;
  category: QuizQuestionCategory;
  numberOfQuestions: number;
}

export interface SearchInput {
  page: number;
  query: string;
  language?: ISO6391Language | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
