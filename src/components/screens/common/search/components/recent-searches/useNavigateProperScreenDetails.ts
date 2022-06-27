import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import * as SchemaTypes from '@schema-types';
import * as Types from '@local-types';
import {Routes} from '@routes/routes';

import {FamousNavigationProp} from '../../../../famous/routes/route-params-types';

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
      const searchTypeMapping = {
        [SchemaTypes.SearchType.PERSON]: handleNavigateFamousDetails,
      };
      searchTypeMapping[props.searchType](item);
    },
    [props.searchType],
  );

  return {
    navigate,
  };
};

export default useNavigateProperScreenDetails;
