import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import LoadingPlaceholder from 'components/common/loading-placeholder/LoadingPlaceholder';
import ProgressiveImage from 'components/common/progressive-image/ProgressiveImage';
import CONSTANTS from 'utils/constants';

const BACKGROUND_IMAGE_THUMBNAIL_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.THUMBNAIL_SIZE_CODE}`;
const BACKGROUND_IMAGE_IMAGE_URL = `${CONSTANTS.VALUES.IMAGES.BASE_URL}/${CONSTANTS.VALUES.IMAGES.LARGE_SIZE_CODE}`;

const Wrapper = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('50%')}px;
`;

const SmokeShadow = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    ...Array(5).fill('transparent'),
    theme.colors.backgroundAlphax4,
    theme.colors.backgroundAlphax3,
    theme.colors.backgroundAlphax2,
    theme.colors.backgroundAlphax1,
    theme.colors.background,
  ],
}))`
  width: 100%;
  height: 100%;
  position: absolute;
`;

type Props = {
  thumbnailURL: string;
  isLoading: boolean;
  imageURL: string;
};

const BackgroundImage = ({ thumbnailURL, isLoading, imageURL }: Props) => (
  <Wrapper
    testID="background-image-wrapper"
  >
    {isLoading ? (
      <LoadingPlaceholder
        indexToDelayAnimation={2}
        testID="background-image-loading"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    ) : (
      <ProgressiveImage
        thumbnailURL={`${BACKGROUND_IMAGE_THUMBNAIL_URL}${thumbnailURL}`}
        imageURL={`${BACKGROUND_IMAGE_IMAGE_URL}${imageURL}`}
        borderRadius={0}
      />
    )}
    <SmokeShadow />
  </Wrapper>
);

export default BackgroundImage;
