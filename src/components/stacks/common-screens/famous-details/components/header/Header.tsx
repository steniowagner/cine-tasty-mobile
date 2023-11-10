import React from 'react';

import { Typography, TMDBImage } from '@common-components';
import { dark } from '@/styles/themes';

import { HeaderLoadingPlaceholder } from './header-loading-placeholder/HeaderLoadingPlaceholder';
import { BirthDayText } from './birthday-text/BirthDayText';
import * as Styles from './Header.styles';

export type HeaderProps = {
  knownForDepartment?: string | null;
  profileImage?: string | null;
  placeOfBirth?: string | null;
  isLoading: boolean;
  birthDate?: string | null;
  name?: string | null;
};

export const Header = (props: HeaderProps) => (
  <Styles.Wrapper testID="header-info">
    <Typography.LargeText testID="name-text" numberOfLines={2} bold>
      {props.name || '-'}
    </Typography.LargeText>
    <Styles.InfoWrapper>
      <TMDBImage
        imageType="profile"
        testID="profile-image"
        image={props.profileImage || ''}
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
            <BirthDayText rawBirthDate={props.birthDate} />
            <Styles.PlaceOfBirthText testID="place-of-birth-text">
              {props.placeOfBirth ?? '-'}
            </Styles.PlaceOfBirthText>
          </Styles.InfoTextWrapper>
          {props.knownForDepartment && (
            <Styles.KnownForDepartmentWrapper>
              <Typography.ExtraSmallText
                testID="known-for-department-text"
                color={dark.colors.buttonText}
                bold>
                {props.knownForDepartment}
              </Typography.ExtraSmallText>
            </Styles.KnownForDepartmentWrapper>
          )}
        </Styles.TextContentWrapper>
      )}
    </Styles.InfoWrapper>
  </Styles.Wrapper>
);
