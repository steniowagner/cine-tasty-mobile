import React from 'react';

import * as SchemaTypes from '@schema-types';

import useTVShowSeasonsListItem from './useEpisodesListItem';
import * as Styles from './EpisodesListItem.styles';

type TVShowSeasonsListItemProps = {
  // eslint-disable-next-line camelcase
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
  index: number;
};

const TVShowSeasonsListItem = ({
  episode,
  index,
}: TVShowSeasonsListItemProps) => {
  const {onPressListItem} = useTVShowSeasonsListItem({episode});

  return (
    <Styles.ListItemWrapper
      onPress={onPressListItem}
      testID="episode-list-item">
      <Styles.Row>
        <Styles.EpisodeIndexWrapper>
          <Styles.EpisodeIndexText testID="episode-index-text">
            {index + 1}
          </Styles.EpisodeIndexText>
        </Styles.EpisodeIndexWrapper>
        <Styles.EpisodeNameText testID="episode-name-text">
          {episode.name}
        </Styles.EpisodeNameText>
      </Styles.Row>
    </Styles.ListItemWrapper>
  );
};

export default TVShowSeasonsListItem;
