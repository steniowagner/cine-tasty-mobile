import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import {renderSVGIconConditionally} from '@components';

import {useFamousListItem} from './useFamousListItem';
import * as Styles from './FamousListItem.styles';

type FamousListItemProps = {
  onPress: () => void;
  image?: string;
  title?: string;
  index: number;
};

export const FamousListItem = memo(
  (props: FamousListItemProps) => {
    const famousListItem = useFamousListItem({
      image: props.image,
      index: props.index,
    });

    return (
      <TouchableOpacity
        testID="famous-list-item-button"
        style={{...famousListItem.measures}}
        onPress={props.onPress}>
        <>
          {/*@ts-ignore*/}
          <Styles.TMDBImageStyled
            onError={famousListItem.onError}
            testID="famous-list-item-image"
            onLoad={famousListItem.onLoad}
            image={props.image}
            imageType="profile"
          />
          {famousListItem.isFallbackImageVisible && (
            <Styles.FallbackImageWrapper
              testID="fallback-image-wrapper"
              style={famousListItem.imageFallbackViewStyle}>
              {renderSVGIconConditionally({
                condition: famousListItem.hasError,
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
        <Styles.PersonName testID="title-text">{props.title}</Styles.PersonName>
      </TouchableOpacity>
    );
  },
  () => true,
);
