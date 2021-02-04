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

export const EPISODES_ERROR_DESCRIPTION_I18N_REF = 'translations:mediaDetail:tvShow:errors:description';
export const EPISODES_ERROR_SUGGESTION_I18N_REF = 'translations:mediaDetail:tvShow:errors:suggestion';
export const EPISODES_SECTION_I18N_REF = 'translations:mediaDetail:tvShow:seasonEpisode:episodes';
export const EPISODES_ERROR_TITLE_I18N_REF = 'translations:mediaDetail:tvShow:errors:title';

const LineDivider = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({ theme }) => theme.colors.subText};
`;

const ListFooterComponent = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.extraLargeSize}px;
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
        description={t(EPISODES_ERROR_DESCRIPTION_I18N_REF)}
        suggestion={t(EPISODES_ERROR_SUGGESTION_I18N_REF)}
        title={t(EPISODES_ERROR_TITLE_I18N_REF)}
        icon="server-network-off"
      />
    );
  }

  return (
    <>
      <FlatList
        ListFooterComponent={() => <ListFooterComponent />}
        ItemSeparatorComponent={() => <LineDivider />}
        ListHeaderComponent={() => (
          <>
            <Header
              overview={seasonDetail.overview}
              image={seasonDetail.posterPath}
            />
            <Section
              title={t(EPISODES_SECTION_I18N_REF)}
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
        testID="season-detail"
      />
    </>
  );
};

export default TVShowSeasonsDetail;
