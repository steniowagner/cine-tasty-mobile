import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import useSeasonOverviewText from './useSeasonOverviewText';

interface WrapperStyleProps {
  readonly shouldShowReadMoreButton: boolean | undefined;
}

const Wrapper = styled(View)<WrapperStyleProps>`
  opacity: ${({ shouldShowReadMoreButton }) => (typeof shouldShowReadMoreButton === 'boolean' ? 1 : 0)};
  align-items: flex-end;
`;

const OverviewText = styled(Text)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('61%')}px;
  color: ${({ theme }) => theme.colors.text};
  margin-left: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ReadMoreText = styled(Text)`
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
`;

const ReadMoreButton = styled(TouchableOpacity)`
  padding-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.smallSize}px;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

type Props = {
  onPressReadMore: () => void;
  overview: string;
};

const SeasonOverviewText = ({ onPressReadMore, overview }: Props) => {
  const {
    shouldShowReadMoreButton,
    onGetTextLayout,
    numberOfLines,
    t,
  } = useSeasonOverviewText();

  if (!overview) {
    return <OverviewText>...</OverviewText>;
  }

  return (
    <Wrapper
      shouldShowReadMoreButton={shouldShowReadMoreButton}
    >
      <OverviewText
        // @ts-ignore onTextLayout does exist on Text component
        onTextLayout={({ nativeEvent: { lines } }) => onGetTextLayout(lines.length)}
        numberOfLines={numberOfLines}
      >
        {overview}
      </OverviewText>
      {shouldShowReadMoreButton && (
        <ReadMoreButton
          onPress={onPressReadMore}
        >
          <ReadMoreText>
            {t('translations:mediaDetail:tvShow:seasonEpisode:readMoreSeasonOverview')}
          </ReadMoreText>
        </ReadMoreButton>
      )}
    </Wrapper>
  );
};

export default SeasonOverviewText;
