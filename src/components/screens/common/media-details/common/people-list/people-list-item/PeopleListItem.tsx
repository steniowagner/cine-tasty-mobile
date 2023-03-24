import React, {memo} from 'react';

import {TMDBImageWithFallback} from '@components';

import * as Styles from './PeopleListItem.styles';

type PeopleListItemProps = {
  onPress: () => void;
  withSubtext: boolean;
  subText: string;
  image: string;
  name: string;
  type: string;
};

export const PeopleListItem = memo(
  (props: PeopleListItemProps) => (
    <Styles.Wrapper
      testID={`button-wrapper-${props.type}`}
      onPress={props.onPress}>
      <TMDBImageWithFallback
        imageType="poster"
        testID="person-image"
        image={props.image}
        style={Styles.sheet.image}
        iconImageLoading="account"
        iconImageError="image-off"
        iconSize={Styles.DEFAULT_ICON_SIZE}
      />
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
  ),
  () => true,
);
