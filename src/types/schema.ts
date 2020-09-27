/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFamous
// ====================================================

export interface GetFamous_people_items {
  __typename: "BasePerson";
  profilePath: string | null;
  name: string | null;
  id: number | null;
}

export interface GetFamous_people {
  __typename: "PeopleQueryResult";
  hasMore: boolean;
  items: GetFamous_people_items[];
}

export interface GetFamous {
  people: GetFamous_people;
}

export interface GetFamousVariables {
  page: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TrendingMovies
// ====================================================

export interface TrendingMovies_trendingMovies_nowPlaying_items {
  __typename: "BaseMovie";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number | null;
  genreIds: string[];
}

export interface TrendingMovies_trendingMovies_nowPlaying {
  __typename: "TrendingMoviesQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingMovies_trendingMovies_nowPlaying_items[];
}

export interface TrendingMovies_trendingMovies_popular_items {
  __typename: "BaseMovie";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number | null;
}

export interface TrendingMovies_trendingMovies_popular {
  __typename: "TrendingMoviesQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingMovies_trendingMovies_popular_items[];
}

export interface TrendingMovies_trendingMovies_topRated_items {
  __typename: "BaseMovie";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number | null;
}

export interface TrendingMovies_trendingMovies_topRated {
  __typename: "TrendingMoviesQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingMovies_trendingMovies_topRated_items[];
}

export interface TrendingMovies_trendingMovies_upcoming_items {
  __typename: "BaseMovie";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number | null;
}

export interface TrendingMovies_trendingMovies_upcoming {
  __typename: "TrendingMoviesQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingMovies_trendingMovies_upcoming_items[];
}

export interface TrendingMovies_trendingMovies {
  __typename: "TrendingMovies";
  nowPlaying: TrendingMovies_trendingMovies_nowPlaying;
  popular: TrendingMovies_trendingMovies_popular;
  topRated: TrendingMovies_trendingMovies_topRated;
  upcoming: TrendingMovies_trendingMovies_upcoming;
}

export interface TrendingMovies {
  trendingMovies: TrendingMovies_trendingMovies;
}

export interface TrendingMoviesVariables {
  page: number;
  language?: ISO6391Language | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TrendingTVShows
// ====================================================

export interface TrendingTVShows_trendingTvShows_onTheAir_items {
  __typename: "BaseTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  name: string | null;
  id: number | null;
  genreIds: string[];
}

export interface TrendingTVShows_trendingTvShows_onTheAir {
  __typename: "TrendingTVShowsQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingTVShows_trendingTvShows_onTheAir_items[];
}

export interface TrendingTVShows_trendingTvShows_popular_items {
  __typename: "BaseTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  name: string | null;
  id: number | null;
}

export interface TrendingTVShows_trendingTvShows_popular {
  __typename: "TrendingTVShowsQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingTVShows_trendingTvShows_popular_items[];
}

export interface TrendingTVShows_trendingTvShows_topRated_items {
  __typename: "BaseTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  name: string | null;
  id: number | null;
}

export interface TrendingTVShows_trendingTvShows_topRated {
  __typename: "TrendingTVShowsQueryResult";
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
  items: TrendingTVShows_trendingTvShows_topRated_items[];
}

export interface TrendingTVShows_trendingTvShows {
  __typename: "TrendingTVShows";
  onTheAir: TrendingTVShows_trendingTvShows_onTheAir;
  popular: TrendingTVShows_trendingTvShows_popular;
  topRated: TrendingTVShows_trendingTvShows_topRated;
}

export interface TrendingTVShows {
  trendingTvShows: TrendingTVShows_trendingTvShows;
}

export interface TrendingTVShowsVariables {
  page: number;
  language?: ISO6391Language | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetArticles
// ====================================================

export interface GetArticles_articles_items {
  __typename: "Article";
  publishedAt: string | null;
  content: string | null;
  source: string | null;
  author: string | null;
  title: string | null;
  image: string | null;
  url: string | null;
  id: string | null;
}

export interface GetArticles_articles {
  __typename: "Articles";
  items: GetArticles_articles_items[];
  hasMore: boolean;
}

export interface GetArticles {
  articles: GetArticles_articles;
}

export interface GetArticlesVariables {
  page: number;
  language: ArticleLanguage;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizQuestions
// ====================================================

export interface GetQuizQuestions_quiz {
  __typename: "Question";
  options: string[];
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
}

export interface GetQuizQuestions {
  quiz: GetQuizQuestions_quiz[];
}

export interface GetQuizQuestionsVariables {
  input: QuizInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFamousDetail
// ====================================================

export interface GetFamousDetail_person_moviesCast {
  __typename: "CastMovie";
  voteAverage: number | null;
  posterPath: string | null;
  mediaType: string | null;
  voteCount: number | null;
  title: string | null;
  id: number | null;
}

export interface GetFamousDetail_person_tvCast {
  __typename: "CastTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  mediaType: string | null;
  voteCount: number | null;
  name: string | null;
  id: number | null;
}

export interface GetFamousDetail_person {
  __typename: "Person";
  knownForDepartment: string | null;
  placeOfBirth: string | null;
  profilePath: string | null;
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  images: string[];
  name: string | null;
  id: number | null;
  moviesCast: GetFamousDetail_person_moviesCast[];
  tvCast: GetFamousDetail_person_tvCast[];
}

export interface GetFamousDetail {
  person: GetFamousDetail_person | null;
}

export interface GetFamousDetailVariables {
  id: number;
  language?: ISO6391Language | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchMovie
// ====================================================

export interface SearchMovie_search_items_BasePerson {
  __typename: "BasePerson" | "BaseTVShow";
}

export interface SearchMovie_search_items_BaseMovie {
  __typename: "BaseMovie";
  voteAverage: number | null;
  posterPath: string | null;
  genreIds: string[];
  title: string | null;
  id: number | null;
}

export type SearchMovie_search_items = SearchMovie_search_items_BasePerson | SearchMovie_search_items_BaseMovie;

export interface SearchMovie_search {
  __typename: "SearchQueryResult";
  totalResults: number;
  hasMore: boolean;
  items: SearchMovie_search_items[];
}

export interface SearchMovie {
  search: SearchMovie_search;
}

export interface SearchMovieVariables {
  input: SearchInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPerson
// ====================================================

export interface SearchPerson_search_items_BaseMovie {
  __typename: "BaseMovie" | "BaseTVShow";
}

export interface SearchPerson_search_items_BasePerson {
  __typename: "BasePerson";
  image: string | null;
  title: string | null;
  id: number | null;
}

export type SearchPerson_search_items = SearchPerson_search_items_BaseMovie | SearchPerson_search_items_BasePerson;

export interface SearchPerson_search {
  __typename: "SearchQueryResult";
  totalResults: number;
  hasMore: boolean;
  items: SearchPerson_search_items[];
}

export interface SearchPerson {
  search: SearchPerson_search;
}

export interface SearchPersonVariables {
  input: SearchInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTVShow
// ====================================================

export interface SearchTVShow_search_items_BasePerson {
  __typename: "BasePerson" | "BaseMovie";
}

export interface SearchTVShow_search_items_BaseTVShow {
  __typename: "BaseTVShow";
  title: string | null;
  voteAverage: number | null;
  posterPath: string | null;
  genreIds: string[];
  id: number | null;
}

export type SearchTVShow_search_items = SearchTVShow_search_items_BasePerson | SearchTVShow_search_items_BaseTVShow;

export interface SearchTVShow_search {
  __typename: "SearchQueryResult";
  totalResults: number;
  hasMore: boolean;
  items: SearchTVShow_search_items[];
}

export interface SearchTVShow {
  search: SearchTVShow_search;
}

export interface SearchTVShowVariables {
  input: SearchInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrendingMovie
// ====================================================

export interface TrendingMovie {
  __typename: "BaseMovie";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  title: string | null;
  id: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TrendingTVShow
// ====================================================

export interface TrendingTVShow {
  __typename: "BaseTVShow";
  voteAverage: number | null;
  posterPath: string | null;
  voteCount: number | null;
  name: string | null;
  id: number | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleLanguage {
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
  UD = "UD",
  ZH = "ZH",
}

export enum ISO6391Language {
  AA = "AA",
  AB = "AB",
  AF = "AF",
  AM = "AM",
  AR = "AR",
  ARAE = "ARAE",
  ARBH = "ARBH",
  ARDZ = "ARDZ",
  AREG = "AREG",
  ARIQ = "ARIQ",
  ARJO = "ARJO",
  ARKW = "ARKW",
  ARLB = "ARLB",
  ARLY = "ARLY",
  ARMA = "ARMA",
  AROM = "AROM",
  ARQA = "ARQA",
  ARSA = "ARSA",
  ARSY = "ARSY",
  ARTN = "ARTN",
  ARYE = "ARYE",
  AS = "AS",
  AY = "AY",
  AZ = "AZ",
  BA = "BA",
  BE = "BE",
  BG = "BG",
  BH = "BH",
  BI = "BI",
  BN = "BN",
  BO = "BO",
  BR = "BR",
  CA = "CA",
  CO = "CO",
  CS = "CS",
  CY = "CY",
  DA = "DA",
  DE = "DE",
  DEAT = "DEAT",
  DECH = "DECH",
  DELI = "DELI",
  DELU = "DELU",
  DIV = "DIV",
  DZ = "DZ",
  EL = "EL",
  EN = "EN",
  ENAU = "ENAU",
  ENBZ = "ENBZ",
  ENCA = "ENCA",
  ENGB = "ENGB",
  ENIE = "ENIE",
  ENJM = "ENJM",
  ENNZ = "ENNZ",
  ENPH = "ENPH",
  ENTT = "ENTT",
  ENUS = "ENUS",
  ENZA = "ENZA",
  ENZW = "ENZW",
  EO = "EO",
  ES = "ES",
  ESAR = "ESAR",
  ESBO = "ESBO",
  ESCL = "ESCL",
  ESCO = "ESCO",
  ESCR = "ESCR",
  ESDO = "ESDO",
  ESEC = "ESEC",
  ESES = "ESES",
  ESGT = "ESGT",
  ESHN = "ESHN",
  ESMX = "ESMX",
  ESNI = "ESNI",
  ESPA = "ESPA",
  ESPE = "ESPE",
  ESPR = "ESPR",
  ESPY = "ESPY",
  ESSV = "ESSV",
  ESUS = "ESUS",
  ESUY = "ESUY",
  ESVE = "ESVE",
  ET = "ET",
  EU = "EU",
  FA = "FA",
  FI = "FI",
  FJ = "FJ",
  FO = "FO",
  FR = "FR",
  FRBE = "FRBE",
  FRCA = "FRCA",
  FRCH = "FRCH",
  FRLU = "FRLU",
  FRMC = "FRMC",
  FY = "FY",
  GA = "GA",
  GD = "GD",
  GL = "GL",
  GN = "GN",
  GU = "GU",
  HA = "HA",
  HE = "HE",
  HI = "HI",
  HR = "HR",
  HU = "HU",
  HY = "HY",
  IA = "IA",
  ID = "ID",
  IE = "IE",
  IK = "IK",
  IN = "IN",
  IS = "IS",
  IT = "IT",
  ITCH = "ITCH",
  IW = "IW",
  JA = "JA",
  JI = "JI",
  JW = "JW",
  KA = "KA",
  KK = "KK",
  KL = "KL",
  KM = "KM",
  KN = "KN",
  KO = "KO",
  KOK = "KOK",
  KS = "KS",
  KU = "KU",
  KY = "KY",
  KZ = "KZ",
  LA = "LA",
  LN = "LN",
  LO = "LO",
  LS = "LS",
  LT = "LT",
  LV = "LV",
  MG = "MG",
  MI = "MI",
  MK = "MK",
  ML = "ML",
  MN = "MN",
  MO = "MO",
  MR = "MR",
  MS = "MS",
  MT = "MT",
  MY = "MY",
  NA = "NA",
  NBNO = "NBNO",
  NE = "NE",
  NL = "NL",
  NLBE = "NLBE",
  NNNO = "NNNO",
  NO = "NO",
  OC = "OC",
  OM = "OM",
  OR = "OR",
  PA = "PA",
  PL = "PL",
  PS = "PS",
  PT = "PT",
  PTBR = "PTBR",
  QU = "QU",
  RM = "RM",
  RN = "RN",
  RO = "RO",
  ROMD = "ROMD",
  RU = "RU",
  RUMD = "RUMD",
  RW = "RW",
  SA = "SA",
  SB = "SB",
  SD = "SD",
  SG = "SG",
  SH = "SH",
  SI = "SI",
  SK = "SK",
  SL = "SL",
  SM = "SM",
  SN = "SN",
  SO = "SO",
  SQ = "SQ",
  SR = "SR",
  SS = "SS",
  ST = "ST",
  SU = "SU",
  SV = "SV",
  SVFI = "SVFI",
  SW = "SW",
  SX = "SX",
  SYR = "SYR",
  TA = "TA",
  TE = "TE",
  TG = "TG",
  TH = "TH",
  TI = "TI",
  TK = "TK",
  TL = "TL",
  TN = "TN",
  TO = "TO",
  TR = "TR",
  TS = "TS",
  TT = "TT",
  TW = "TW",
  UK = "UK",
  UR = "UR",
  US = "US",
  UZ = "UZ",
  VI = "VI",
  VO = "VO",
  WO = "WO",
  XH = "XH",
  YI = "YI",
  YO = "YO",
  ZH = "ZH",
  ZHCN = "ZHCN",
  ZHHK = "ZHHK",
  ZHMO = "ZHMO",
  ZHSG = "ZHSG",
  ZHTW = "ZHTW",
  ZU = "ZU",
}

export enum QuestionCategory {
  MIXED = "MIXED",
  MOVIE = "MOVIE",
  TV = "TV",
}

export enum QuestionDifficulty {
  EASY = "EASY",
  HARD = "HARD",
  MEDIUM = "MEDIUM",
  MIXED = "MIXED",
}

export enum QuestionType {
  BOOLEAN = "BOOLEAN",
  MIXED = "MIXED",
  MULTIPLE = "MULTIPLE",
}

export enum SearchType {
  MOVIE = "MOVIE",
  PERSON = "PERSON",
  TV = "TV",
}

export interface QuizInput {
  difficulty: QuestionDifficulty;
  type: QuestionType;
  category: QuestionCategory;
  numberOfQuestions: number;
}

export interface SearchInput {
  page: number;
  query: string;
  type: SearchType;
  language?: ISO6391Language | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
