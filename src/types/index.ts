import {
  FetchMoreQueryOptions,
  ApolloQueryResult,
  FetchMoreOptions,
} from 'apollo-client';

import { GetArticlesVariables, GetArticles } from './schema';

export enum ThemeID {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export type LocalStackRoute = {
  id: string;
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
