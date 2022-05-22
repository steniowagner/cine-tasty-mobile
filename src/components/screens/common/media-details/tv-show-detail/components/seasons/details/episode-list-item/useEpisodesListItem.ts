import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {TVShowSeasonsNavigationProp} from '@src/components/screens/common/tv-show-seasons/routes/route-params-types';
import * as SchemaTypes from '@schema-types';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';
import metrics from '@styles/metrics';

type UseTVShowSeasonsListItemProps = {
  // eslint-disable-next-line camelcase
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
};

const useTVShowSeasonsListItem = ({episode}: UseTVShowSeasonsListItemProps) => {
  const navigation = useNavigation<TVShowSeasonsNavigationProp>();

  const onPressListItem = useCallback(() => {
    console.warn('TODO');
  }, [episode]);

  return {
    onPressListItem,
  };
};

export default useTVShowSeasonsListItem;
