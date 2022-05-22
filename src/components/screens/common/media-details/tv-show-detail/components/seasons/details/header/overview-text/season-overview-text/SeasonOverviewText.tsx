import React from 'react';

import {useSeasonOverviewText} from './useSeasonOverviewText';
import * as Styles from './SeasonOverviewText.styles';

type SeasonOverviewTextProps = {
  overview: string;
  season: number;
};

export const SeasonOverviewText = (props: SeasonOverviewTextProps) => {
  const seasonOverviewText = useSeasonOverviewText({
    overview: props.overview,
    season: props.season,
  });

  if (!props.overview) {
    return (
      <Styles.OverviewText testID="overview-text">...</Styles.OverviewText>
    );
  }

  return (
    <Styles.Wrapper
      shouldShowReadMoreButton={seasonOverviewText.shouldShowReadMoreButton}
      testID="season-overview-wrapper">
      <Styles.OverviewText
        onTextLayout={({nativeEvent: {lines}}) =>
          seasonOverviewText.onGetTextLayout(lines.length)
        }
        numberOfLines={seasonOverviewText.numberOfLines}
        testID="overview-text">
        {props.overview}
      </Styles.OverviewText>
      {seasonOverviewText.shouldShowReadMoreButton && (
        <Styles.ReadMoreButton
          onPress={seasonOverviewText.onPressReadMore}
          testID="read-more-button">
          <Styles.ReadMoreText testID="read-more-text">
            {seasonOverviewText.readMoreButtonText}
          </Styles.ReadMoreText>
        </Styles.ReadMoreButton>
      )}
    </Styles.Wrapper>
  );
};
