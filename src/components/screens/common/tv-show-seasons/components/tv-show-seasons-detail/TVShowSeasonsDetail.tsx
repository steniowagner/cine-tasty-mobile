import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';

import {LoadingIndicator, Section, Advise} from '@components';
import * as TRANSLATIONS from '@i18n/tags';

import TVShowSeasonsListItem from './tv-show-list-item/TVShowSeasonsListItem';
import {TVShowSeasonsTabsStackProps} from '../../routes/route-params-types';
import useTVShowSeasonsDetail from './useTVShowSeasonsDetail';
import * as Styles from './TVShowSeasonsDetail.styles';
import Header from './header/Header';

export const TVShowSeasonsDetail = ({route}: TVShowSeasonsTabsStackProps) => {
  const {seasonDetail, isLoading, hasError, t} = useTVShowSeasonsDetail({
    season: route.params.season,
    id: route.params.id,
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
        icon="alert-box"
      />
    );
  }

  return (
    <ScrollView testID="season-detail">
      <Header
        season={seasonDetail.seasonNumber}
        overview={seasonDetail.overview}
        image={seasonDetail.posterPath}
        tvShowTitle={route.params.tvShowTitle}
      />
      <Section
        title={t(TRANSLATIONS.MEDIA_DETAIL_TV_SHOWS_SEASON_EPISODE_EPISODE)}
        noMarginBottom>
        <></>
      </Section>
      {seasonDetail.episodes.map((seasonDetailItem, index) => (
        <Fragment key={seasonDetailItem.id}>
          <TVShowSeasonsListItem episode={seasonDetailItem} index={index} />
          {index !== seasonDetail.episodes.length - 1 ? (
            <Styles.LineDivider />
          ) : (
            <Styles.ListFooterComponent />
          )}
        </Fragment>
      ))}
    </ScrollView>
  );
};
