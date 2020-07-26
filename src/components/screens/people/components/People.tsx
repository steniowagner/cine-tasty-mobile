/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { RefreshControl, Platform, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import ListFooterComponent from 'components/common/pagination-footer/PaginationFooter';
import HeaderIconButton from 'components/common/HeaderIconButton';
import { SEARCH_PERSON } from 'components/screens/search/queries';
import LoadingIndicator from 'components/common/LoadingIndicator';
import PopupAdvice from 'components/common/PopupAdvice';
import DefaultListItem, {
  DEFAULT_LIST_ITEM_HEIGHT,
} from 'components/common/DefaultListItem';
import { SearchType } from 'types/schema';
import metrics from 'styles/metrics';

import { PeopleStackParams } from '../routes/route-params-types';
import usePeople from './usePeople';

const NUMBER_FLATLIST_COLUMNS = 3;

const CustomRefreshControl = styled(RefreshControl).attrs(({ theme }) => ({
  progressBackgroundColor: theme.colors.primary,
  tintColor: theme.colors.primary,
  colors: [theme.colors.text],
}))``;

type PeopleScreenNavigationProp = StackNavigationProp<PeopleStackParams, 'PEOPLE'>;

type Props = {
  navigation: PeopleScreenNavigationProp;
};

const People = ({ navigation }: Props) => {
  const {
    onPullRefreshControl,
    onPressReloadButton,
    hasPaginationError,
    isPaginating,
    onEndReached,
    isRefreshing,
    isLoading,
    people,
    error,
  } = usePeople();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={() => navigation.navigate('SEARCH', {
            i18nQueryByPaginationErrorRef:
                'translations:people:i18nQueryByPaginationErrorRef',
            i18nSearchBarPlaceholderRef: 'translations:people:searchBarPlaceholder',
            i18nQueryByTextErrorRef: 'translations:people:i18nQueryByTextErrorRef',
            searchType: SearchType.PERSON,
            query: SEARCH_PERSON,
          })}
          iconName="magnify"
          withMarginRight
        />
      ),
    });
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <FlatList
        testID="people-list"
        refreshControl={(
          <CustomRefreshControl
            onRefresh={onPullRefreshControl}
            refreshing={isRefreshing}
          />
        )}
        ListFooterComponent={() => (
          <ListFooterComponent
            onPressReloadButton={onPressReloadButton}
            hasError={hasPaginationError}
            isPaginating={isPaginating}
          />
        )}
        columnWrapperStyle={{
          paddingLeft: metrics.smallSize,
        }}
        contentContainerStyle={{
          paddingTop: metrics.mediumSize,
          paddingBottom: metrics.mediumSize,
        }}
        onEndReachedThreshold={Platform.select({
          android: 0.5,
          ios: 0.1,
        })}
        getItemLayout={(_, index: number) => ({
          length: DEFAULT_LIST_ITEM_HEIGHT,
          offset: DEFAULT_LIST_ITEM_HEIGHT * Math.floor(index / NUMBER_FLATLIST_COLUMNS),
          index,
        })}
        numColumns={NUMBER_FLATLIST_COLUMNS}
        renderItem={({ item, index }) => (
          <DefaultListItem
            onPress={() => console.log(item)}
            numberOfColumns={NUMBER_FLATLIST_COLUMNS}
            image={item.profilePath}
            title={item.name}
            index={index}
          />
        )}
        keyExtractor={({ id }, index) => `${id}-${index}`}
        onEndReached={onEndReached}
        data={people}
      />
      {!!error && (
      <PopupAdvice
        onFinishToShow={() => {}}
        text={error}
      />
      )}
    </>
  );
};

export default People;
