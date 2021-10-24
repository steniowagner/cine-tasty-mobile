import React from 'react';

import useSeasonOverviewText from './useSeasonOverviewText';
import * as Styles from './SeasonOverviewText.styles';

type SeasonOverviewTextProps = {
  tvShowTitle: string;
  overview: string;
  season: number;
};

const SeasonOverviewText = ({
  tvShowTitle,
  overview,
  season,
}: SeasonOverviewTextProps) => {
  const {
    shouldShowReadMoreButton,
    readMoreButtonText,
    onGetTextLayout,
    onPressReadMore,
    numberOfLines,
  } = useSeasonOverviewText({
    tvShowTitle,
    overview,
    season,
  });

  if (!overview) {
    return (
      <Styles.OverviewText
        testID="overview-text"
      >
        ...
      </Styles.OverviewText>
    );
  }

  return (
    <>
      <Styles.Wrapper
        shouldShowReadMoreButton={shouldShowReadMoreButton}
        testID="season-overview-wrapper"
      >
        <Styles.OverviewText
          // @ts-ignore onTextLayout does exist on Text component
          onTextLayout={({ nativeEvent: { lines } }) => onGetTextLayout(lines.length)}
          numberOfLines={numberOfLines}
          testID="overview-text"
        >
          {overview}
        </Styles.OverviewText>
        {shouldShowReadMoreButton && (
          <Styles.ReadMoreButton
            onPress={onPressReadMore}
            testID="read-more-button"
          >
            <Styles.ReadMoreText
              testID="read-more-text"
            >
              {readMoreButtonText}
            </Styles.ReadMoreText>
          </Styles.ReadMoreButton>
        )}
      </Styles.Wrapper>
    </>
  );
};

export default SeasonOverviewText;
