import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components';

import LoadingIndicator from 'components/common/LoadingIndicator';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';

import TVShowSeasonsListItem from './tv-show-list-item/TVShowSeasonsListItem';
import { TVShowSeasonsStackParams } from '../../routes/route-params-types';
import useTVShowSeasonsDetail from './useTVShowSeasonsDetail';
import Header from './header/Header';

const LineDivider = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({ theme }) => theme.colors.subText};
`;

type Params = {
  route: RouteProp<TVShowSeasonsStackParams, 'SEASON_DETAIL'>;
};

const TVShowSeasonsDetail = ({ route }: Params) => {
  const {
    seasonDetail, isLoading, hasError, t,
  } = useTVShowSeasonsDetail({
    season: route.params.season,
    id: route.params.id,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (hasError) {
    return (
      <Advise
        description={t('translations:errors:network:description')}
        suggestion={t('translations:errors:network:suggestion')}
        title={t('translations:errors:network:title')}
        icon="server-network-off"
      />
    );
  }

  return (
    <>
      <FlatList
        ItemSeparatorComponent={() => <LineDivider />}
        ListHeaderComponent={() => (
          <>
            <Header
              overview={seasonDetail.overview}
              image={seasonDetail.posterPath}
            />
            <Section
              title={t('translations:mediaDetail:tvShow:seasonEpisode:episodes')}
              noMarginBottom
            >
              <></>
            </Section>
          </>
        )}
        keyExtractor={({ id: episodeId }) => episodeId}
        data={seasonDetail.episodes}
        renderItem={({ item, index }) => (
          <TVShowSeasonsListItem
            episode={item}
            index={index}
          />
        )}
      />
    </>
  );
};

export default TVShowSeasonsDetail;
