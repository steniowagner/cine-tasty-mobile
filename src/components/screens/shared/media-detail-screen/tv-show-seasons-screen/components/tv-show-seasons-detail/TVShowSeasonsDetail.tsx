import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import styled from 'styled-components';

import { TVShowSeasonsDetail_tvShowSeason_episodes as Episode } from 'types/schema';
import LoadingIndicator from 'components/common/LoadingIndicator';
import Advise from 'components/common/advise/Advise';
import Section from 'components/common/Section';

import useTVShowSeasonsDetail from './useTVShowSeasonsDetail';
import TVShowSeasonsListItem from './TVShowSeasonsListItem';
import EpisodeOverviewDetail from './EpisodeOverviewDetail';
import ModalDetail from './modal-detail/ModalDetail';
import EpisodeDetail from './EpisodeDetail';
import Header from './header/Header';

const LineDivider = styled(View)`
  width: 100%;
  margin-vertical: ${({ theme }) => theme.metrics.mediumSize}px;
  height: ${StyleSheet.hairlineWidth}px;
  background-color: ${({ theme }) => theme.colors.subText};
`;

type Params = {
  season: number;
  id: string;
};

const TVShowSeasonsDetail = ({ season, id }: Params) => {
  const {
    onPressOverviewReadMoreButton,
    isEpisodeDetailModalOpen,
    onPressEpisodeButton,
    isOverviewModalOpen,
    onPressCloseModal,
    seasonDetail,
    modalContent,
    isLoading,
    hasError,
    t,
  } = useTVShowSeasonsDetail({ season, id });

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
              onPressReadMoreButton={() => onPressOverviewReadMoreButton(seasonDetail.overview)}
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
        data={seasonDetail.episodes}
        keyExtractor={({ id: episodeId }) => episodeId}
        renderItem={({ item, index }) => (
          <TVShowSeasonsListItem
            onPress={() => onPressEpisodeButton(item)}
            title={item.name}
            index={index}
          />
        )}
      />
      {isOverviewModalOpen && (
        <ModalDetail
          onCloseModal={onPressCloseModal}
        >
          <EpisodeOverviewDetail
            overview={modalContent as string}
          />
        </ModalDetail>
      )}
      {isEpisodeDetailModalOpen && (
        <ModalDetail
          onCloseModal={onPressCloseModal}
        >
          <EpisodeDetail
            episode={modalContent as Episode}
          />
        </ModalDetail>
      )}
    </>
  );
};

export default TVShowSeasonsDetail;
