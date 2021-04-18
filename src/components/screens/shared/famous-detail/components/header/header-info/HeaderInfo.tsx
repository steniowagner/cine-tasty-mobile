import React from 'react';

import KnownForDepartment from '../known-for-department/KnownForDepartment';
import HeaderLoadingPlaceholder from '../header-loading-placeholder/HeaderLoadingPlaceholder';
import BirthDayText from '../birthday-text/BirthDayText';
import ProfileImage from '../profile-image/ProfileImage';
import * as Styles from './HeaderInfo.styles';
import InfoText from '../InfoText';

type HeaderInfoProps = {
  knownForDepartment: string;
  profileImage: string;
  placeOfBirth: string;
  isLoading: boolean;
  birthDate: string;
  name: string;
};

const HeaderInfo = ({
  knownForDepartment,
  placeOfBirth,
  profileImage,
  isLoading,
  birthDate,
  name,
}: HeaderInfoProps) => (
  <Styles.Wrapper>
    <Styles.NameText
      testID="name-text"
    >
      {name}
    </Styles.NameText>
    <Styles.InfoWrapper>
      <ProfileImage
        profileImage={profileImage}
      />
      {isLoading ? (
        <HeaderLoadingPlaceholder />
      ) : (
        <Styles.TextContentWrapper>
          <Styles.InfoTextWrapper>
            {!!birthDate && (
            <BirthDayText
              rawBirthDate={birthDate}
            />
            )}
            {!!placeOfBirth && (
              <InfoText
                // @ts-ignore
                withVerticalMargin
              >
                {placeOfBirth}
              </InfoText>
            )}
          </Styles.InfoTextWrapper>
          <KnownForDepartment
            knownForDepartment={knownForDepartment}
          />
        </Styles.TextContentWrapper>
      )}
    </Styles.InfoWrapper>
  </Styles.Wrapper>
);

export default HeaderInfo;
