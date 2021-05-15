import React from 'react';
import { FlatList } from 'react-native';

import LoadingIndicator from '@components/common/loading-indicator/LoadingIndicator';
import Section from '@components/common/section/Section';
import Advise from '@components/common/advise/Advise';
import * as TRANSLATIONS from '@i18n/tags';

import TVShowSeasonsListItem from './tv-show-list-item/TVShowSeasonsListItem';
import { TVShowSeasonsTabsStackProps } from '../../routes/route-params-types';
import useTVShowSeasonsDetail from './useTVShowSeasonsDetail';
import * as Styles from './TVShowSeasonsDetail.styles';
import Header from './header/Header';

const TVShowSeasonsDetail = (props: TVShowSeasonsTabsStackProps) => {
  const {
    seasonDetail, isLoading, hasError, t,
  } = useTVShowSeasonsDetail({
    season: props.route.params.season,
    id: props.route.params.id,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (hasError) {
    return (
      <Advise
        description={t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_ERRORS_DESCRIPTION)}
        suggestion={t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_ERRORS_SUGGESTION)}
        title={t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_ERRORS_TITLE)}
        icon="server-network-off"
      />
    );
  }

  return (
    <>
      <FlatList
        ListFooterComponent={() => <Styles.ListFooterComponent />}
        ItemSeparatorComponent={() => <Styles.LineDivider />}
        ListHeaderComponent={() => (
          <>
            <Header
              overview={seasonDetail.overview}
              image={seasonDetail.posterPath}
            />
            <Section
              title={t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_EPISODE)}
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
