import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {TVShowSeasonsNavigationProp} from '@src/components/screens/common/tv-show-seasons/routes/route-params-types';
import * as SchemaTypes from '@schema-types';

type UseTVShowSeasonsListItemProps = {
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
};

export const useTVShowSeasonsListItem = (
  props: UseTVShowSeasonsListItemProps,
) => {
  const navigation = useNavigation<TVShowSeasonsNavigationProp>();

  const onPressListItem = useCallback(() => {
    console.warn('TODO');
  }, [props]);

  return {
    onPressListItem,
  };
};
