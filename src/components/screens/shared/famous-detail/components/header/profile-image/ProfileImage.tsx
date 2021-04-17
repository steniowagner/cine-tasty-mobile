import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ProfileImage.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type Props = {
  profileImage: string;
};

const ProfileImage = ({ profileImage }: Props) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image: profileImage,
  });

  return (
    <>
      <TMDBImage
        imageType="profile"
        onError={onError}
        onLoad={onLoad}
        image={profileImage}
        testID="profile-image"
        style={{
          width: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          height: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: DEFAULT_ICON_SIZE,
              id: 'account',
            },
          })}
        </Styles.FallbackImageWrapper>
      )}
    </>
  );
};

export default ProfileImage;
