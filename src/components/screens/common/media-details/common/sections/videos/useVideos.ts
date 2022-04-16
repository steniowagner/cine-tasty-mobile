import {useCallback, useMemo} from 'react';
import {Linking} from 'react-native';

import {useTranslations} from '@hooks';
import {Translations} from '@i18n/tags';

export const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v=';

export const useVideos = () => {
  const translations = useTranslations();

  const handlePressVideo = useCallback((key: string) => {
    Linking.openURL(`${YOUTUBE_BASE_URL}${key}`);
  }, []);

  const texts = useMemo(
    () => ({
      section: Translations.Tags.MEDIA_DETAIL_SECTIONS_VIDEOS,
    }),
    [translations.translate],
  );

  return {
    onPressVideo: handlePressVideo,
    texts,
  };
};
