import React from 'react';

import { LoadingPlaceholder } from '@common-components';

import * as TVShowSeasonStyles from '../../TVShowSeason.styles';
import * as Styles from './TVShowSeasonLoading.styles';

export const TVShowSeasonLoading = () => (
  <>
    <TVShowSeasonStyles.Header testID="tvshow-season-loading">
      <LoadingPlaceholder style={TVShowSeasonStyles.sheet.headerImage} />
      <TVShowSeasonStyles.HeaderTextWrapper>
        <LoadingPlaceholder
          indexToDelayAnimation={1}
          style={Styles.sheet.title}
        />
        <LoadingPlaceholder
          indexToDelayAnimation={2}
          style={Styles.sheet.season}
        />
        <LoadingPlaceholder
          indexToDelayAnimation={3}
          style={Styles.sheet.votes}
        />
      </TVShowSeasonStyles.HeaderTextWrapper>
    </TVShowSeasonStyles.Header>
    <Styles.LoadingEpisodeWrapper>
      {Array(5)
        .fill({})
        .map((_, index) => (
          <React.Fragment key={index}>
            <LoadingPlaceholder
              indexToDelayAnimation={index + 4}
              style={
                index % 2 === 0
                  ? Styles.sheet.episodeFullLength
                  : Styles.sheet.episodeHalfLength
              }
            />
          </React.Fragment>
        ))}
    </Styles.LoadingEpisodeWrapper>
  </>
);
