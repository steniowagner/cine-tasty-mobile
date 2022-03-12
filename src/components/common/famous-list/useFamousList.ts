import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FamousNavigationProp} from '@components/screens/famous/routes/route-params-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

type UseFamousListProps = {
  beforePressItem?: (famous: Types.Famous) => unknown;
  hasPaginationError: boolean;
  famous: Types.Famous[];
  isPaginating: boolean;
  isLoading: boolean;
  error?: string;
};

const useFamousList = (props: UseFamousListProps) => {
  const navigation = useNavigation<FamousNavigationProp>();

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
      navigation.navigate(Routes.Famous.DETAILS, famous);
    },
    [props.beforePressItem],
  );

  return {
    onPressFamousListItem: handlePressFamousListItem,
    shouldShowBottomReloadButton,
    shouldShowTopReloadButton,
  };
};

export default useFamousList;
