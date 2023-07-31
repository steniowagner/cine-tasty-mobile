import {useEffect, useRef} from 'react';
import {TextInput} from 'react-native';

export const useSearchBar = () => {
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return {
    inputRef,
  };
};
