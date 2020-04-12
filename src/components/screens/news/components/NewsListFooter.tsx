import React from 'react';

import PaginationFooterLoading from '../../../common/PaginationFooterLoading';
import ReloadButton from './ReloadButton';

type Props = {
  isFooterLoadMoreButtonVisible: boolean;
  onPressLoadMore: () => void;
  isPaginating: boolean;
};

const NewsListFooter = ({
  isFooterLoadMoreButtonVisible,
  onPressLoadMore,
  isPaginating,
}: Props) => {
  if (isPaginating) {
    return <PaginationFooterLoading />;
  }

  if (isFooterLoadMoreButtonVisible) {
    return (
      <ReloadButton
        onPress={onPressLoadMore}
      />
    );
  }

  return null;
};

export default NewsListFooter;
