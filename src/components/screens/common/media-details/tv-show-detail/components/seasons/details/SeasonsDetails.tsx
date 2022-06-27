import React, {Fragment} from 'react';
import {ScrollView} from 'react-native';

import {LoadingIndicator, Section, Advise} from '@components';

import TVShowSeasonsListItem from './episode-list-item/EpisodesListItem';
import {useSeasonsDetails} from './useSeasonsDetails';
import * as Styles from './SeasonsDetails.styles';
import Header from './header/Header';

type SeasonsDetailsProps = {
  season: number;
  id: string;
};

export const SeasonsDetails = (props: SeasonsDetailsProps) => {
  const seasonsDetails = useSeasonsDetails({
    season: props.season,
    id: props.id,
  });

  if (seasonsDetails.isLoading) {
    return <LoadingIndicator />;
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
    <ScrollView testID="season-detail">
      <Header
        season={seasonsDetails.data.seasonNumber}
        overview={seasonsDetails.data.overview}
        image={seasonsDetails.data.posterPath}
      />
      <Section title={seasonsDetails.texts.epsiode} noMarginBottom>
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
  );
};
