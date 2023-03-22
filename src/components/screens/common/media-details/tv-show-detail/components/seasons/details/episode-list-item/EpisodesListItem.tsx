import React from 'react';

import * as SchemaTypes from '@schema-types';

import * as Styles from './EpisodesListItem.styles';

type TVShowSeasonsListItemProps = {
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
  index: number;
};

export const TVShowSeasonsListItem = (props: TVShowSeasonsListItemProps) => (
  <Styles.ListItemWrapper testID="episode-list-item">
    <Styles.Row>
      <Styles.EpisodeIndexWrapper>
        <Styles.EpisodeIndexText testID="episode-index-text">
          {props.index + 1}
        </Styles.EpisodeIndexText>
      </Styles.EpisodeIndexWrapper>
      <Styles.EpisodeNameText testID="episode-name-text">
        {props.episode.name}
      </Styles.EpisodeNameText>
    </Styles.Row>
  </Styles.ListItemWrapper>
);
