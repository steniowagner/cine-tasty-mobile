import {useCallback, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FamousNavigationProp} from '@components/screens/famous/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import {useAlertMessage} from '@providers';
import {Routes} from '@routes/routes';

type UseFamousListProps = {
  famous: SchemaTypes.GetFamous_people_items[];
  hasPaginationError: boolean;
  isPaginating: boolean;
  isLoading: boolean;
  error?: string;
};

const useFamousList = (props: UseFamousListProps) => {
  const navigation = useNavigation<FamousNavigationProp>();
  const alertMessage = useAlertMessage();

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
    (famous: SchemaTypes.GetFamous_people_items) => {
      navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: famous.profilePath,
        name: famous.name,
        id: famous.id,
      });
    },
    [],
  );

  useEffect(() => {
    if (!props.error) {
      return;
    }
    alertMessage.show(props.error);
  }, [props.error]);

  return {
    onPressFamousListItem: handlePressFamousListItem,
    shouldShowBottomReloadButton,
    shouldShowTopReloadButton,
  };
};

export default useFamousList;
