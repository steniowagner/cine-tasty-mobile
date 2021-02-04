import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

import { TVShowSeasonsDetail_tvShowSeason_episodes as Episode } from 'types/schema';
import Icon from 'components/common/Icon';
import CONSTANTS from 'utils/constants';

import useTVShowSeasonsListItem from './useTVShowSeasonsListItem';
import EpisodeDetail from './episode-detail/EpisodeDetail';
import ModalDetail from '../ModalDetail';

const ListItemWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${CONSTANTS.VALUES.DEFAULT_SPACING}px;
`;

const EpisodeNameText = styled(Text).attrs({
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
  episode: Episode;
  index: number;
};

const TVShowSeasonsListItem = ({ episode, index }: Props) => {
  const { onPressListItem, onCloseModal, isModalOpen } = useTVShowSeasonsListItem();

  return (
    <>
      <ListItemWrapper
        onPress={onPressListItem}
        testID="episode-list-item"
      >
        <Row>
          <EpisodeIndexWrapper>
            <EpisodeIndexText
              testID="episode-index-text"
            >
              {index + 1}
            </EpisodeIndexText>
          </EpisodeIndexWrapper>
          <EpisodeNameText
            testID="episode-name-text"
          >
            {episode.name}
          </EpisodeNameText>
        </Row>
        <ChevronRightIcon />
      </ListItemWrapper>
      {isModalOpen && (
        <ModalDetail
          onCloseModal={onCloseModal}
        >
          <EpisodeDetail
            episode={episode}
          />
        </ModalDetail>
      )}
    </>
  );
};

export default TVShowSeasonsListItem;
