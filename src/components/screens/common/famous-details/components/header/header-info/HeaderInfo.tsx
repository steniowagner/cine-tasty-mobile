import React from 'react';

import {TMDBImageWithFallback} from '@components';

import {KnownForDepartment} from '../known-for-department/KnownForDepartment';
import {HeaderLoadingPlaceholder} from '../header-loading-placeholder/HeaderLoadingPlaceholder';
import * as HeaderStyles from '../Header.styles';
import {BirthDayText} from '../birthday-text/BirthDayText';
import * as Styles from './HeaderInfo.styles';

export type HeaderInfoProps = {
  knownForDepartment: string;
  profileImage: string;
  placeOfBirth: string;
  isLoading: boolean;
  birthDate: string;
  name: string;
};

export const HeaderInfo = (props: HeaderInfoProps) => (
  <Styles.Wrapper testID="header-info">
    <Styles.NameText testID="name-text">{props.name}</Styles.NameText>
    <Styles.InfoWrapper>
      <TMDBImageWithFallback
        imageType="profile"
        testID="profile-image"
        image={props.profileImage}
        style={Styles.sheet.profileImage}
        iconImageLoading="account"
        iconImageError="image-off"
        iconSize={Styles.PROFILE_IMAGE_ICON_SIZE}
      />
      {props.isLoading ? (
        <HeaderLoadingPlaceholder />
      ) : (
        <Styles.TextContentWrapper testID="text-content-wrapper">
          <Styles.InfoTextWrapper>
            {!!props.birthDate && (
              <BirthDayText rawBirthDate={props.birthDate} />
            )}
            {!!props.placeOfBirth && (
              <HeaderStyles.DefaultText
                marginBottom={HeaderStyles.DEFAULT_MARGIN_VERTICAL}
                testID="place-of-birth">
                {props.placeOfBirth}
              </HeaderStyles.DefaultText>
            )}
          </Styles.InfoTextWrapper>
          <KnownForDepartment knownForDepartment={props.knownForDepartment} />
        </Styles.TextContentWrapper>
      )}
    </Styles.InfoWrapper>
  </Styles.Wrapper>
);
