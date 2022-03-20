import {AlertButton, Alert} from 'react-native';

type ShowLanguageAlertParams = {
  onPressPositiveAction?: () => void;
  onPressNegativeAction?: () => void;
  negativeActionTitle?: string;
  positiveActionTitle?: string;
  singleAction?: boolean;
  description: string;
  title: string;
};

export const showLanguageAlert = (params: ShowLanguageAlertParams) => {
  const alertOptions: AlertButton[] = [
    {
      text: params.positiveActionTitle,
      onPress: () =>
        params.onPressPositiveAction && params.onPressPositiveAction(),
    },
  ];
  if (!params.singleAction) {
    alertOptions.unshift({
      text: params.negativeActionTitle,
      style: 'cancel',
      onPress: () =>
        params.onPressNegativeAction && params.onPressNegativeAction(),
    });
  }
  Alert.alert(params.title, params.description, alertOptions, {
    cancelable: false,
  });
};
