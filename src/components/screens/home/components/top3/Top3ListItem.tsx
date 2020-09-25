import React from 'react';
import { Animated, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import StarsVotes from 'components/common/stars-votes/StarsVotes';
import RoundedButton from 'components/common/RoundedButton';
import CONSTANTS from 'utils/constants';

import {
  ITEM_MARGING_HORIZONTAL,
  ITEM_BORDER_RADIUS,
  SmokeShadow,
  ITEM_WIDTH,
  ITEM_HEIGHT,
} from './commonStyles';

const PROFILE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;
const PROFILE_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_SIZE_CODE}`;

interface ItemWrapperStyleProps {
  readonly isTheMiddle: boolean;
  readonly width: number;
}

const Wrapper = styled(Animated.View)<ItemWrapperStyleProps>`
  width: ${ITEM_WIDTH}px;
  margin-horizontal: ${({ isTheMiddle }) => (isTheMiddle ? ITEM_MARGING_HORIZONTAL : 0)}px;
  height: ${ITEM_HEIGHT}px;
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
  numberOfLines: 3,
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
  voteAverage: number;
  genres: string[];
  width: number;
  image: string;
  title: string;
};

const Top3ListItem = ({
  isTheMiddle,
  voteAverage,
  translateY,
  onPress,
  genres,
  width,
  image,
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
        borderRadius={ITEM_BORDER_RADIUS}
      />
      <SmokeShadow />
      <TextContentWrapper>
        <TitleText>{title}</TitleText>
        <StarsVotes
          withText
          votes={voteAverage}
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

export default Top3ListItem;
