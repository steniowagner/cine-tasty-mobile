import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import {renderSVGIconConditionally} from '@components';
import metrics from '@styles/metrics';

import {useFamousListItem} from './useFamousListItem';
import * as Styles from './FamousListItem.styles';

const DEFAULT_ICON_SIZE = metrics.getWidthFromDP('14%');

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
              style={[
                {
                  opacity: famousListItem.opacity,
                },
              ]}>
              {renderSVGIconConditionally({
                condition: famousListItem.hasError,
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
        <Styles.PersonName testID="title-text">{props.title}</Styles.PersonName>
      </TouchableOpacity>
    );
  },
  () => true,
);
