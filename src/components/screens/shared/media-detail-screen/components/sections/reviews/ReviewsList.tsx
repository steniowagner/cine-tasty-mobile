import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import MediaItemDescription from 'components/common/media-item-description/MediaItemDescription';
import metrics from 'styles/metrics';

const ContentWrapper = styled(View)`
  width: 100%;
`;

const ReviewsText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.getWidthFromDP('6%')}px;
  color: ${({ theme }) => theme.colors.text};
`;

const AuthorText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.smallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const Separator = styled(View)`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('0.5%')}px;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  background-color: ${({ theme }) => theme.colors.contrast};
`;

type Review = {
  author: string;
  content: string;
};

type Props = {
  reviews: Review[];
};

const ReviewsList = ({ reviews }: Props) => {
  const { t } = useTranslation();

  return (
    <FlatList
      renderItem={({ item }) => (
        <ContentWrapper>
          <AuthorText>{item.author}</AuthorText>
          <MediaItemDescription
            description={item.content}
          />
        </ContentWrapper>
      )}
      contentContainerStyle={{
        padding: metrics.mediumSize,
      }}
      ListHeaderComponent={() => (
        <ReviewsText>{t('translations:mediaDetail:sections:reviews')}</ReviewsText>
      )}
      ItemSeparatorComponent={() => <Separator />}
      data={reviews}
    />
  );
};

export default ReviewsList;
