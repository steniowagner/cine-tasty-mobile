import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {FamousNavigationProp} from '@components/screens/famous/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

type UseNavigationProperScreenDetails = {
  searchType: SchemaTypes.SearchType;
};

const useNavigateProperScreenDetails = (
  props: UseNavigationProperScreenDetails,
) => {
  const navigation = useNavigation<FamousNavigationProp>();

  const handleNavigateFamousDetails = useCallback(
    (item: Types.ResentSearchItem) => {
      navigation.navigate(Routes.Famous.DETAILS, {
        profileImage: item.image,
        name: item.title,
        id: item.id,
      });
    },
    [navigation],
  );

  const navigate = useCallback(
    (item: Types.ResentSearchItem) => {
      switch (props.searchType) {
        case SchemaTypes.SearchType.PERSON:
          return handleNavigateFamousDetails(item);
        default:
          return;
      }
    },
    [props.searchType],
  );

  return {
    navigate,
  };
};

export default useNavigateProperScreenDetails;
