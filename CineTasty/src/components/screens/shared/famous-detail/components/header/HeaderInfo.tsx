import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import HeaderLoadingPlaceholder from './HeaderLoadingPlaceholder';
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
  width: ${({ theme }) => theme.metrics.getWidthFromDP('63%')}px;
`;

const NameText = styled(Text)`
  width: 65%;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize}px;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('10%')}px;
  font-family: CircularStd-Black;
  color: ${({ theme }) => theme.colors.text};
`;

const KnownForDepartmentWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('18%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.extraSmallSize}px;
  padding-vertical: ${({ theme }) => theme.metrics.extraSmallSize}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const TextContentWrapper = styled(View)`
  justify-content: center;
  padding-left: ${({ theme }) => theme.metrics.mediumSize}px;
`;

type Props = {
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
}: Props) => (
  <Wrapper>
    <NameText
      testID="name-text"
    >
      {name}
    </NameText>
    <InfoWrapper>
      <ProfileImage
        profileImage={profileImage}
      />
      {isLoading ? (
        <HeaderLoadingPlaceholder />
      ) : (
        <TextContentWrapper>
          <InfoTextWrapper>
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
          </InfoTextWrapper>
          {!!knownForDepartment && (
            <KnownForDepartmentWrapper>
              <InfoText
                // @ts-ignore
                withCustomColor
              >
                {knownForDepartment}
              </InfoText>
            </KnownForDepartmentWrapper>
          )}
        </TextContentWrapper>
      )}
    </InfoWrapper>
  </Wrapper>
);

export default HeaderInfo;
