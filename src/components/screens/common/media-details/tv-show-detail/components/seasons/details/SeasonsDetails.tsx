import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';

import {Section, Advise} from '@components';

import {TVShowSeasonsListItem} from './episode-list-item/EpisodesListItem';
import {LoadingSeasonsDetails} from './loading-seasons-details/LoadingSeasonsDetails';
import {SeasonOverviewDetailsModal} from './season-overview-details-modal/SeasonOverviewDetailsModal';
import {useSeasonsDetails} from './useSeasonsDetails';
import * as Styles from './SeasonsDetails.styles';
import {Header} from './header/Header';

type SeasonsDetailsProps = {
  season: number;
  tvShowTitle: string;
  id: string;
};

export const SeasonsDetails = (props: SeasonsDetailsProps) => {
  const seasonsDetails = useSeasonsDetails({
    tvShowTitle: props.tvShowTitle,
    season: props.season,
    id: props.id,
  });

  if (seasonsDetails.isLoading) {
    return <LoadingSeasonsDetails />;
  }

  if (seasonsDetails.hasError) {
    return (
      <Advise
        description={seasonsDetails.texts.advise.description}
        suggestion={seasonsDetails.texts.advise.suggestion}
        title={seasonsDetails.texts.advise.title}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <ScrollView testID="season-detail">
        <Header
          openSeasonOverviewDetailsModal={
            seasonsDetails.openSeasonOverviewDetailsModal
          }
          season={seasonsDetails.data?.seasonNumber}
          overview={seasonsDetails.data?.overview}
          image={seasonsDetails.data?.posterPath}
        />
        <Section title={seasonsDetails.texts.epsiodes} noMarginBottom>
          <></>
        </Section>
        {seasonsDetails.data.episodes.map((episode, index) => (
          <Fragment key={episode.id}>
            <TVShowSeasonsListItem episode={episode} index={index} />
            {index !== seasonsDetails.data.episodes.length - 1 && (
              <Styles.LineDivider />
            )}
          </Fragment>
        ))}
      </ScrollView>
      <SeasonOverviewDetailsModal
        title={seasonsDetails.texts.modal.title}
        ctaButtonTitle={seasonsDetails.texts.modal.ctaTitle}
        onPressCtaButton={seasonsDetails.onCloseSeasonOverviewDetailsModal}
        onClose={seasonsDetails.onCloseSeasonOverviewDetailsModal}
        overview={seasonsDetails.data?.overview}
        isOpen={seasonsDetails.isSeasonOverviewModalOpen}
      />
    </>
  );
};
