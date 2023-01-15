import {useCallback} from 'react';
import {Linking} from 'react-native';

export const useNewsListItem = () => {
  const handleOnPress = useCallback(async (url: string) => {
    const canOpenURL = await Linking.canOpenURL(url);
    if (canOpenURL) {
      Linking.openURL(url);
    }
  }, []);

  return {
    onPress: handleOnPress,
  };
};
