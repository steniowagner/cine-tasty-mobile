import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FamousNavigationProp} from '@components/screens/famous/routes/route-params-types';
import {Routes} from '@routes/routes';

export type Famous = {
  profileImage: string | null;
  name: string | null;
  id: number | null;
};

type UseFamousListProps = {
  hasPaginationError: boolean;
  isPaginating: boolean;
  isLoading: boolean;
  famous: Famous[];
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

  const handlePressFamousListItem = useCallback((famous: Famous) => {
    navigation.navigate(Routes.Famous.DETAILS, famous);
  }, []);

  return {
    onPressFamousListItem: handlePressFamousListItem,
    shouldShowBottomReloadButton,
    shouldShowTopReloadButton,
  };
};

export default useFamousList;
