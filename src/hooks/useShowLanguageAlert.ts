import { useCallback } from 'react';
import { AlertButton, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useGetCurrentISO6391Language } from '@hooks';
import * as SchemaTypes from '@schema-types';

type HandleShowLanguageAlertParams = {
  onPressPositiveAction?: () => void;
  onPressNegativeAction?: () => void;
  descriptioni18nRef: string;
  negativei18nRef?: string;
  positive18nRef: string;
  singleAction?: boolean;
  titlei18nRef: string;
};

export const useShowLanguageAlert = () => {
  const { currentISO6391Language } = useGetCurrentISO6391Language();
  const { t } = useTranslation();

  const handleShowLanguageAlert = useCallback(
    ({
      onPressPositiveAction = () => {},
      onPressNegativeAction,
      descriptioni18nRef,
      negativei18nRef,
      positive18nRef,
      singleAction,
      titlei18nRef,
    }: HandleShowLanguageAlertParams) => {
      if (currentISO6391Language === SchemaTypes.ISO6391Language.EN) {
        onPressPositiveAction();
        return;
      }

      const alertOptions: AlertButton[] = [
        {
          text: t(positive18nRef),
          onPress: () => onPressPositiveAction(),
        },
      ];

      if (!singleAction) {
        alertOptions.unshift({
          text: t(negativei18nRef),
          style: 'cancel',
          onPress: () => onPressNegativeAction && onPressNegativeAction(),
        });
      }

      Alert.alert(t(titlei18nRef), t(descriptioni18nRef), alertOptions, {
        cancelable: false,
      });
    },
    [],
  );

  return {
    handleShowLanguageAlert,
  };
};
