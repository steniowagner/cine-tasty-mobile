import React from 'react';

import renderSVGIconConditionally from '@components/common/svg-icon/renderSVGIconConditionally';
import TMDBImage from '@components/common/tmdb-image/TMDBImage';
import { useLoadListItemImage } from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './PeopleListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type PeopleListItemProps = {
  onPress: () => void;
  withSubtext?: boolean;
  isFirst: boolean;
  subText: string;
  image: string;
  name: string;
  type: string;
};

const PeopleListItem = ({
  withSubtext = true,
  onPress,
  isFirst,
  subText,
  image,
  name,
  type,
}: PeopleListItemProps) => {
  const {
    isFallbackImageVisible,
    hasError,
    onError,
    opacity,
    onLoad,
  } = useLoadListItemImage({
    image,
  });

  return (
    <Styles.Wrapper
      testID={`button-wrapper-${type}`}
      isFirst={isFirst}
      onPress={onPress}
    >
      <TMDBImage
        testID="person-image"
        imageType="poster"
        onError={onError}
        onLoad={onLoad}
        image={image}
        style={{
          width: '100%',
          height: '100%',
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
      <Styles.ContentWrapper>
        <Styles.SmokeShadow />
        <Styles.TextContentWrapper>
          <Styles.PersonNameText
            testID="person-name"
          >
            {name}
          </Styles.PersonNameText>
          {withSubtext && (
            <Styles.PersonSubText
              testID="person-subtext"
            >
              {subText}
            </Styles.PersonSubText>
          )}
        </Styles.TextContentWrapper>
      </Styles.ContentWrapper>
    </Styles.Wrapper>
  );
};

export default PeopleListItem;
