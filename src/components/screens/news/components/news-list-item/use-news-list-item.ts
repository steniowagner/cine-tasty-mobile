import { useCallback } from 'react';
import { Linking } from 'react-native';

type UseNewsListItemParams = {
  url?: string;
};

export const useNewsListItem = (params: UseNewsListItemParams) => {
  const handlePress = useCallback(async () => {
    if (!params.url) {
      return;
    }
    const canOpenURL = await Linking.canOpenURL(params.url);
    if (canOpenURL) {
      Linking.openURL(params.url);
    }
  }, [params.url]);

  return {
    onPress: handlePress,
  };
};
