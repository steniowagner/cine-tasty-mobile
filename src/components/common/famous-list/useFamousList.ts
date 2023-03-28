import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {SharedScreensNavigation} from '@src/types';
import {getRouteName} from '@src/components/screens/common/famous-details/routes/route-params-types';
import * as Types from '@local-types';

type UseFamousListProps = {
  beforePressItem?: (famous: Types.Famous) => unknown;
  hasPaginationError: boolean;
  famous: Types.Famous[];
  isPaginating: boolean;
  isLoading: boolean;
  error?: string;
};

export const useFamousList = (props: UseFamousListProps) => {
  const navigation = useNavigation<SharedScreensNavigation>();

  const shouldShowTopReloadButton = useMemo(
    () => !props.famous.length && !!props.error && !props.isLoading,
    [props.famous, props.error, props.isLoading],
  );

  const shouldShowBottomReloadButton = useMemo(
    () =>
      !!props.famous.length && (props.hasPaginationError || props.isPaginating),
    [props.famous, props.hasPaginationError, props.isPaginating],
  );

  const handlePressFamousListItem = useCallback(
    (famous: Types.Famous) => {
      props.beforePressItem && props.beforePressItem(famous);
      const route = getRouteName(navigation.getState().routes[0].name);
      navigation.navigate(route, famous);
    },
    [props.beforePressItem],
  );

  return {
    onPressFamousListItem: handlePressFamousListItem,
    shouldShowBottomReloadButton,
    shouldShowTopReloadButton,
  };
};
