import { useCallback } from 'react';
import { Linking } from 'react-native';

export const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

export const useVideos = () => {
  const handlePress = useCallback((key?: string | null) => {
    if (!key) {
      return;
    }
    Linking.openURL(`${YOUTUBE_BASE_URL}${key}`);
  }, []);

  return {
    onPress: handlePress,
  };
};
