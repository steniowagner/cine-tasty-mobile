import React from 'react';
import { Animated, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import StarsVotes from 'components/common/stars-votes/StarsVotes';
import RoundedButton from 'components/common/RoundedButton';
import CONSTANTS from 'utils/constants';
import metrics from 'styles/metrics';

const PROFILE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;
const PROFILE_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_SIZE_CODE}`;

interface ItemWrapperStyleProps {
  readonly isTheMiddle: boolean;
  readonly width: number;
}

const Wrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${({ width }) => width}px;
  margin-horizontal: ${({ isTheMiddle, theme }) => (isTheMiddle ? theme.metrics.largeSize : 0)}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('58%')}px;
`;

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['rgba(38, 38, 38, 0)', 'rgba(38, 38, 38, 0.8)', theme.colors.background],
}))`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const TextContentWrapper = styled(View)`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
`;

const TitleText = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('8%')}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Black;
  text-align: center;
`;

const GenreText = styled(Text)`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
  text-align: center;
`;

const LearnMoreButtonWrapper = styled(View)`
  width: 65%;
`;

type Props = {
  translateY: Animated.AnimatedInterpolation;
  isTheMiddle: boolean;
  onPress: () => void;
  genres: string[];
  width: number;
  image: string;
  title: string;
  votes: number;
};

const HeaderListItem = ({
  isTheMiddle,
  translateY,
  onPress,
  genres,
  width,
  image,
  votes,
  title,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper
      isTheMiddle={isTheMiddle}
      style={{
        transform: [{ translateY }],
      }}
      width={width}
    >
      <ProgressiveImage
        thumbnailURL={`${PROFILE_THUMBNAIL_URL}${image}`}
        imageURL={`${PROFILE_IMAGE_URL}${image}`}
        borderRadius={metrics.mediumSize}
      />
      <SmokeShadow />
      <TextContentWrapper>
        <TitleText>{title}</TitleText>
        <StarsVotes
          withText
          votes={votes}
        />
        <GenreText>{genres.join('  \u2022  ')}</GenreText>
        <LearnMoreButtonWrapper>
          <RoundedButton
            onPress={onPress}
            text={t('translations:home:learMoreButtonText')}
          />
        </LearnMoreButtonWrapper>
      </TextContentWrapper>
    </Wrapper>
  );
};

export default HeaderListItem;
