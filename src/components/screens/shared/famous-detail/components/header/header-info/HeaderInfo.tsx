import React from 'react';

import KnownForDepartment from '../known-for-department/KnownForDepartment';
import HeaderLoadingPlaceholder from '../header-loading-placeholder/HeaderLoadingPlaceholder';
import InfoText, { DEFAULT_MARGIN_VERTICAL } from '../InfoText';
import BirthDayText from '../birthday-text/BirthDayText';
import ProfileImage from '../profile-image/ProfileImage';
import * as Styles from './HeaderInfo.styles';

type HeaderInfoProps = {
  knownForDepartment: string;
  profileImage: string;
  placeOfBirth: string;
  isLoading: boolean;
  birthDate: string;
  name: string;
};

const HeaderInfo = (props: HeaderInfoProps) => (
  <Styles.Wrapper>
    <Styles.NameText
      testID="name-text"
    >
      {props.name}
    </Styles.NameText>
    <Styles.InfoWrapper>
      <ProfileImage
        profileImage={props.profileImage}
      />
      {props.isLoading ? (
        <HeaderLoadingPlaceholder />
      ) : (
        <Styles.TextContentWrapper>
          <Styles.InfoTextWrapper>
            {!!props.birthDate && (
            <BirthDayText
              rawBirthDate={props.birthDate}
            />
            )}
            {!!props.placeOfBirth && (
              <InfoText
                marginBottom={DEFAULT_MARGIN_VERTICAL}
              >
                {props.placeOfBirth}
              </InfoText>
            )}
          </Styles.InfoTextWrapper>
          <KnownForDepartment
            knownForDepartment={props.knownForDepartment}
          />
        </Styles.TextContentWrapper>
      )}
    </Styles.InfoWrapper>
  </Styles.Wrapper>
);

export default HeaderInfo;
