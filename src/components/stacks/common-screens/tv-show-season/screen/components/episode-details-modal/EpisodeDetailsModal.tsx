import React from 'react';

import { TvShowSeason_tvShowSeason_episodes } from '@schema-types';
import { dark } from '@/styles/themes';
import metrics from '@/styles/metrics';
import {
  MediaItemDescription,
  StarsVotes,
  ModalSheet,
  TMDBImage,
} from '@common-components';

import * as Styles from './EpisodeDetailsModal.styles';

type EpisodeDetailsModalProps = {
  episode?: TvShowSeason_tvShowSeason_episodes;
  onCloseModal: () => void;
};

export const EpisodeDetailsModal = (props: EpisodeDetailsModalProps) => (
  <ModalSheet
    title=""
    ctaButtonTitle=""
    onClose={props.onCloseModal}
    isOpen={!!props.episode}
    height={metrics.getHeightFromDP('35')}>
    <Styles.Wrapper>
      <Styles.Row>
        <TMDBImage
          imageType="still"
          image={props.episode?.stillPath || ''}
          style={Styles.sheet.image}
          iconImageLoading="video-vintage"
          iconImageError="image-off"
          iconSize={Styles.IMAGE_ICON_SIZE}
        />
        <Styles.TextWrapper>
          <Styles.EpisodeTitle testID="episode-modal-title">
            {props.episode?.name || '-'}
          </Styles.EpisodeTitle>
          <StarsVotes
            voteCount={props.episode?.voteCount || 0}
            votes={props.episode?.voteAverage || 0}
            textColor={dark.colors.buttonText}
            withText
          />
        </Styles.TextWrapper>
      </Styles.Row>
      <MediaItemDescription
        description={props.episode?.overview}
        color={dark.colors.buttonText}
      />
    </Styles.Wrapper>
  </ModalSheet>
);
