import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';

const MIN_SUPPORTED_ANDROID_API_VERSION = 29;
const MIN_SUPPORTED_IOS_VERSION = 13;

type State = {
  hasThemeSupport: boolean;
};

const useCheckHasThemeSupport = (): State => {
  const checkAndroidHasThemeSupport = useCallback(
    () => Platform.Version >= MIN_SUPPORTED_ANDROID_API_VERSION,
    [],
  );

  const checkIOSHasThemeSupport = useCallback(
    () => parseInt(Platform.Version as string, 10) >= MIN_SUPPORTED_IOS_VERSION,
    [],
  );

  const hasThemeSupport = useMemo(() => {
    if (Platform.OS === 'android') {
      return checkAndroidHasThemeSupport();
    }

    return checkIOSHasThemeSupport();
  }, []);

  return {
    hasThemeSupport,
  };
};

export default useCheckHasThemeSupport;
