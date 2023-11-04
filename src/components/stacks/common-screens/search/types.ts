export enum SearchType {
  MOVIE = 'MOVIE',
  FAMOUS = 'FAMOUS',
  TV = 'TV',
}

export type RecentSearchItem = {
  title: string;
  image: string;
  id: number;
};
