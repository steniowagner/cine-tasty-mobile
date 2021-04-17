import React from 'react';

import EpisodeOverviewDetail from '../episode-overview-detail/EpisodeOverviewDetail';
import useSeasonOverviewText from './useSeasonOverviewText';
import ModalDetail from '../../../modal-detail/ModalDetail';
import * as Styles from './SeasonOverviewText.styles';

type Props = {
  overview: string;
};

const SeasonOverviewText = ({ overview }: Props) => {
  const {
    shouldShowReadMoreButton,
    readMoreButtonText,
    onGetTextLayout,
    onPressReadMore,
    numberOfLines,
    onCloseModal,
    isModalOpen,
  } = useSeasonOverviewText();

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
      {isModalOpen && (
        <ModalDetail
          onCloseModal={onCloseModal}
        >
          <EpisodeOverviewDetail
            overview={overview}
          />
        </ModalDetail>
      )}
    </>
  );
};

export default SeasonOverviewText;
