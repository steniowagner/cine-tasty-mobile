/* tslint:disable */

// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryNews
// ====================================================

export interface QueryNews_news_items {
  __typename: 'NewsArticle';
  author: string | null;
  content: string | null;
}

export interface QueryNews_news {
  __typename: 'NewsResult';
  items: QueryNews_news_items[];
}

export interface QueryNews {
  news: QueryNews_news;
}

export interface QueryNewsVariables {
  page: number;
  language: NewsLanguage;
}

/* tslint:disable */

// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum NewsLanguage {
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
  ZH = 'ZH',
}

//==============================================================
// END Enums and Input Objects
//==============================================================
