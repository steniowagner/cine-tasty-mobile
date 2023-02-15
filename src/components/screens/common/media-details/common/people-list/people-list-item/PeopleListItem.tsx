import React, {memo} from 'react';

import {renderSVGIconConditionally} from '@components';
import {useImageFallbackView} from '@hooks';
import metrics from '@styles/metrics';

import * as Styles from './PeopleListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

type PeopleListItemProps = {
  onPress: () => void;
  withSubtext: boolean;
  subText: string;
  image: string;
  name: string;
  type: string;
};

export const PeopleListItem = memo(
  (props: PeopleListItemProps) => {
    const imageFallbackView = useImageFallbackView({
      image: props.image,
    });
    return (
      <Styles.Wrapper
        testID={`button-wrapper-${props.type}`}
        onPress={props.onPress}>
        <Styles.TMDBImageStyled
          testID="person-image"
          imageType="poster"
          onError={imageFallbackView.onError}
          onLoad={imageFallbackView.onLoad}
          image={props.image}
          style={{}}
        />
        {imageFallbackView.isFallbackImageVisible && (
          <Styles.FallbackImageWrapper
            testID="fallback-image-wrapper"
            style={imageFallbackView.imageFallbackViewStyle}>
            {renderSVGIconConditionally({
              condition: imageFallbackView.hasError,
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
            <Styles.PersonNameText testID="person-name">
              {props.name}
            </Styles.PersonNameText>
            {props.withSubtext && (
              <Styles.PersonSubText testID="person-subtext">
                {props.subText}
              </Styles.PersonSubText>
            )}
          </Styles.TextContentWrapper>
        </Styles.ContentWrapper>
      </Styles.Wrapper>
    );
  },
  () => true,
);
