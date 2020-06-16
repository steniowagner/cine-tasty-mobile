/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetArticles
// ====================================================

export interface GetArticles_articles_items {
  __typename: 'Article';
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
  __typename: 'Articles';
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
  __typename: 'Question';
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

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleLanguage {
  AR = 'AR',
  DE = 'DE',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  HE = 'HE',
  IT = 'IT',
  NL = 'NL',
  NO = 'NO',
  PT = 'PT',
  RU = 'RU',
  SE = 'SE',
  UD = 'UD',
  ZH = 'ZH',
}

export enum QuestionCategory {
  MIXED = 'MIXED',
  MOVIE = 'MOVIE',
  TV = 'TV',
}

export enum QuestionDifficulty {
  EASY = 'EASY',
  HARD = 'HARD',
  MEDIUM = 'MEDIUM',
  MIXED = 'MIXED',
}

export enum QuestionType {
  BOOLEAN = 'BOOLEAN',
  MIXED = 'MIXED',
  MULTIPLE = 'MULTIPLE',
}

export interface QuizInput {
  difficulty: QuestionDifficulty;
  type: QuestionType;
  category: QuestionCategory;
  numberOfQuestions: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
