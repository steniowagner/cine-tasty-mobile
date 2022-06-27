import {useCallback, useEffect, useRef} from 'react';
import {TextInput} from 'react-native';

type UseSearchBarProps = {
  onTypeSearchQuery: (query: string) => void;
};

const useSearchBar = (props: UseSearchBarProps) => {
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangeText = useCallback(
    (text: string) => {
      props.onTypeSearchQuery(text);
    },
    [props.onTypeSearchQuery],
  );

  return {
    onChangeText: handleChangeText,
    inputRef,
  };
};

export default useSearchBar;
