import React from 'react';

import {renderSVGIconConditionally, TMDBImage} from '@components';
import {useImageFallbackView} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ProfileImage.styles';

type ProfileImageProps = {
  profileImage: string;
};

const ProfileImage = (props: ProfileImageProps) => {
  const imageFallbackView = useImageFallbackView({
    image: props.profileImage,
  });
  return (
    <>
      <TMDBImage
        imageType="profile"
        onError={imageFallbackView.onError}
        onLoad={imageFallbackView.onLoad}
        image={props.profileImage}
        testID="profile-image"
        style={{
          width: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          height: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {imageFallbackView.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-profile-image-wrapper"
          style={imageFallbackView.imageFallbackViewStyle}>
          {renderSVGIconConditionally({
            condition: imageFallbackView.hasError,
            ifTrue: {
              colorThemeRef: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'image-off',
            },
            ifFalse: {
              colorThemeRef: 'fallbackImageIcon',
              size: Styles.DEFAULT_ICON_SIZE,
              id: 'account',
            },
          })}
        </Styles.FallbackImageWrapper>
      )}
    </>
  );
};

export default ProfileImage;
