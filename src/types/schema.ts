/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchFamous
// ====================================================

export interface SearchFamous_searchFamous_items {
  __typename: "SearchFamousItem";
  profilePath: string | null;
  name: string | null;
  id: number | null;
}

export interface SearchFamous_searchFamous {
  __typename: "SearchFamousResult";
  items: SearchFamous_searchFamous_items[];
  hasMore: boolean;
}

export interface SearchFamous {
  searchFamous: SearchFamous_searchFamous;
}

export interface SearchFamousVariables {
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
