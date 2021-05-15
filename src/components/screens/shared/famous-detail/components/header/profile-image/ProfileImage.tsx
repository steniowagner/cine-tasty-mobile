import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ProfileImage.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type ProfileImageProps = {
  profileImage: string;
};

const ProfileImage = (props: ProfileImageProps) => {
  const loadListItemImage = useLoadListItemImage({
    image: props.profileImage,
  });

  return (
    <>
      <TMDBImage
        imageType="profile"
        onError={loadListItemImage.onError}
        onLoad={loadListItemImage.onLoad}
        image={props.profileImage}
        testID="profile-image"
        style={{
          width: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          height: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {loadListItemImage.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: loadListItemImage.opacity,
            },
          ]}
        >
          {renderSVGIconConditionally({
            condition: loadListItemImage.hasError,
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
