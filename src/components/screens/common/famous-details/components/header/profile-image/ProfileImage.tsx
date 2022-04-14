import React from 'react';

import {renderSVGIconConditionally, TMDBImage} from '@components';
import {useLoadListItemImage} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './ProfileImage.styles';

type ProfileImageProps = {
  profileImage: string;
};

const ProfileImage = (props: ProfileImageProps) => {
  const loadListImage = useLoadListItemImage({
    image: props.profileImage,
  });
  return (
    <>
      <TMDBImage
        imageType="profile"
        onError={loadListImage.onError}
        onLoad={loadListImage.onLoad}
        image={props.profileImage}
        testID="profile-image"
        style={{
          width: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          height: metrics.getWidthFromDP(Styles.IMAGE_SQUARE_PERCENTAGE),
          borderRadius: metrics.extraSmallSize,
        }}
      />
      {loadListImage.isFallbackImageVisible && (
        <Styles.FallbackImageWrapper
          testID="fallback-image-wrapper"
          style={[
            {
              opacity: loadListImage.opacity,
            },
          ]}>
          {renderSVGIconConditionally({
            condition: loadListImage.hasError,
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
