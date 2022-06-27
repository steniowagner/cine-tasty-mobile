import {useCallback, useMemo, useState} from 'react';
import {useTheme} from 'styled-components/native';

import * as Types from '@local-types';

type ImageStatus = 'LOADING' | 'ERROR' | 'LOADED';

type UseThumbsGalleryListItemProps = {
  isSelected: boolean;
};

export const useThumbsGalleryListItem = (
  props: UseThumbsGalleryListItemProps,
) => {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('LOADING');

  const theme = useTheme();

  const handleOnLoad = useCallback(() => {
    setImageStatus('LOADED');
  }, []);

  const handleOnError = useCallback(() => {
    setImageStatus('ERROR');
  }, []);

  const borderColor = useMemo(() => {
    if (!props.isSelected) {
      return 'transparent';
    }
    return theme.id === Types.ThemeId.DARK
      ? theme.colors.primary
      : theme.colors.buttonText;
  }, [props.isSelected, theme]);

  return {
    onError: handleOnError,
    onLoad: handleOnLoad,
    imageStatus,
    borderColor,
  };
};
