/* eslint-disable camelcase */
import React from 'react';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import * as SchemaTypes from '@schema-types';
import metrics from '@styles/metrics';

import useTVShowSeasonsListItem from './useTVShowSeasonsListItem';
import EpisodeDetail from './episode-detail/EpisodeDetail';
import * as Styles from './TVShowSeasonsListItem.styles';
import ModalDetail from '../modal-detail/ModalDetail';

type TVShowSeasonsListItemProps = {
  episode: SchemaTypes.TVShowSeasonsDetail_tvShowSeason_episodes;
  index: number;
};

const TVShowSeasonsListItem = (props: TVShowSeasonsListItemProps) => {
  const tvShowSeasonsListItem = useTVShowSeasonsListItem();

  return (
    <>
      <Styles.ListItemWrapper
        onPress={tvShowSeasonsListItem.onPressListItem}
        testID="episode-list-item"
      >
        <Styles.Row>
          <Styles.EpisodeIndexWrapper>
            <Styles.EpisodeIndexText
              testID="episode-index-text"
            >
              {props.index + 1}
            </Styles.EpisodeIndexText>
          </Styles.EpisodeIndexWrapper>
          <Styles.EpisodeNameText
            testID="episode-name-text"
          >
            {props.episode.name}
          </Styles.EpisodeNameText>
        </Styles.Row>
        <SVGIcon
          size={metrics.getWidthFromDP('10%')}
          colorThemeRef="primary"
          id="chevron-right"
        />
      </Styles.ListItemWrapper>
      {tvShowSeasonsListItem.isModalOpen && (
        <ModalDetail
          onCloseModal={tvShowSeasonsListItem.onCloseModal}
        >
          <EpisodeDetail
            episode={props.episode}
          />
        </ModalDetail>
      )}
    </>
  );
};

export default TVShowSeasonsListItem;
