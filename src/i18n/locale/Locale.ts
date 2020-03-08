type Tabs = 'discover' | 'people' | 'quiz' | 'news';

export interface Locale {
  tabs: Record<Tabs, string>;
}
