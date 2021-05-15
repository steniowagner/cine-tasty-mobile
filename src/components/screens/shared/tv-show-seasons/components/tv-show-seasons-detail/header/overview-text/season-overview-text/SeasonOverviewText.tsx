import React from 'react';

import EpisodeOverviewDetail from '../episode-overview-detail/EpisodeOverviewDetail';
import useSeasonOverviewText from './useSeasonOverviewText';
import ModalDetail from '../../../modal-detail/ModalDetail';
import * as Styles from './SeasonOverviewText.styles';

type SeasonOverviewTextProps = {
  overview: string;
};

const SeasonOverviewText = (props: SeasonOverviewTextProps) => {
  const seasonOverviewText = useSeasonOverviewText();

  if (!props.overview) {
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
        shouldShowReadMoreButton={seasonOverviewText.shouldShowReadMoreButton}
        testID="season-overview-wrapper"
      >
        <Styles.OverviewText
          // @ts-ignore onTextLayout does exist on Text component
          onTextLayout={({ nativeEvent: { lines } }) => seasonOverviewText.onGetTextLayout(lines.length)}
          numberOfLines={seasonOverviewText.numberOfLines}
          testID="overview-text"
        >
          {props.overview}
        </Styles.OverviewText>
        {seasonOverviewText.shouldShowReadMoreButton && (
          <Styles.ReadMoreButton
            onPress={seasonOverviewText.onPressReadMore}
            testID="read-more-button"
          >
            <Styles.ReadMoreText
              testID="read-more-text"
            >
              {seasonOverviewText.readMoreButtonText}
            </Styles.ReadMoreText>
          </Styles.ReadMoreButton>
        )}
      </Styles.Wrapper>
      {seasonOverviewText.isModalOpen && (
        <ModalDetail
          onCloseModal={seasonOverviewText.onCloseModal}
        >
          <EpisodeOverviewDetail
            overview={props.overview}
          />
        </ModalDetail>
      )}
    </>
  );
};

export default SeasonOverviewText;
