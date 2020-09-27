import {
  FetchMoreQueryOptions,
  ApolloQueryResult,
  FetchMoreOptions,
} from 'apollo-client';

import {
  SearchPerson_search_items_BasePerson as SearchPersonResult,
  SearchMovie_search_items_BaseMovie as SearchMovieResult,
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

export type SearchItem = SearchMovieResult | SearchPersonResult;

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

export type SimplifiedMedia = {
  voteAverage: number;
  voteCount: number;
  image: string;
  title: string;
  id: number;
};

export type HomeTop3Item = {
  voteAverage: number;
  genres: string[];
  image: string;
  title: string;
  id: number;
};

export type HomeSection = {
  data: SimplifiedMedia[];
  sectionTitle: string
};
