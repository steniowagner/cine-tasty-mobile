import { useState, useCallback, useEffect } from 'react';

type State = {
  setIsStatusBarOpen: (value: boolean) => void;
  setQuery: (value: string) => void;
  onPressSearch: () => void;
  isSearchBarOpen: boolean;
  query: string;
};

const usePeople = (): State => {
  const [isSearchBarOpen, setIsStatusBarOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    console.log('useEffect: ', query);
  }, [query]);

  useEffect(() => {
    if (!isSearchBarOpen && query) {
      setQuery('');
    }
  }, [isSearchBarOpen]);

  const onPressSearch = useCallback(() => {
    console.log('20: ', query);
  }, [query]);

  return {
    setIsStatusBarOpen,
    isSearchBarOpen,
    onPressSearch,
    setQuery,
    query,
  };
};

export default usePeople;
