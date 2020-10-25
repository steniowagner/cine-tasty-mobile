import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

const ListItemWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const SeasonNameText = styled(Text).attrs({
  numberOfLines: 2,
})`
  width: 75%;
  margin-left: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.text};
  font-family: CircularStd-Bold;
`;

const EpisodeIndexText = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-family: CircularStd-Black;
`;

const EpisodeIndexWrapper = styled(View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('12%')}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ChevronRightIcon = styled(Icon).attrs(({ theme }) => ({
  size: theme.metrics.getWidthFromDP('10%'),
  color: theme.colors.primary,
  name: 'chevron-right',
}))``;

type Props = {
  onPress: () => void;
  index: number;
  title: string;
};

const TVShowSeasonsListItem = ({ onPress, index, title }: Props) => (
  <ListItemWrapper
    onPress={onPress}
  >
    <Row>
      <EpisodeIndexWrapper>
        <EpisodeIndexText>{index + 1}</EpisodeIndexText>
      </EpisodeIndexWrapper>
      <SeasonNameText>{title}</SeasonNameText>
    </Row>
    <TouchableOpacity>
      <ChevronRightIcon />
    </TouchableOpacity>
  </ListItemWrapper>
);

export default TVShowSeasonsListItem;
