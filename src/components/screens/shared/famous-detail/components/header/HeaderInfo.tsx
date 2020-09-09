import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import BirthDayText from './birthday-text/BirthDayText';
import ProfileImage from './profile-image/ProfileImage';
import InfoText from './InfoText';

const Wrapper = styled(View)`
  width: 100%;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.metrics.getWidthFromDP('30%')}px;
  margin-horizontal: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const InfoWrapper = styled(View)`
  flex-direction: row;
`;

const InfoTextWrapper = styled(View)`
  justify-content: center;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const NameText = styled(Text)`
  width: 65%;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.text};
`;

type Props = {
  knownForDepartment: string;
  profileImage: string;
  placeOfBirth: string;
  birthDate: string;
  name: string;
};

const HeaderInfo = ({
  placeOfBirth,
  knownForDepartment,
  profileImage,
  birthDate,
  name,
}: Props) => (
  <Wrapper>
    <NameText>{name}</NameText>
    <InfoWrapper>
      <ProfileImage
        profileImage={profileImage}
      />
      <InfoTextWrapper>
        <BirthDayText
          rawBirthDate={birthDate}
        />
        <InfoText
          withVerticalMargin
        >
          {placeOfBirth}
        </InfoText>
        <InfoText
          withCustomColor
        >
          {knownForDepartment}
        </InfoText>
      </InfoTextWrapper>
    </InfoWrapper>
  </Wrapper>
);

export default HeaderInfo;
