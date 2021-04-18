import React from 'react';
import { FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import MediaItemDescription from '@components/common/media-item-description/MediaItemDescription';
import * as TRANSLATIONS from '@i18n/tags';
import metrics from '@styles/metrics';

import { MovieDetailInternalternalParams } from '../routes/route-params-types';
import * as Styles from './Reviews.styles';

export type ReviewsExternalParams = {
  navigation: StackNavigationProp<MovieDetailInternalternalParams, 'REVIEWS'>;
  route: RouteProp<MovieDetailInternalternalParams, 'REVIEWS'>;
};

const Reviews = ({ route }: ReviewsExternalParams) => {
  const { t } = useTranslation();

  return (
    <FlatList
      renderItem={({ item }) => (
        <Styles.ContentWrapper>
          <Styles.AuthorText>{item.author}</Styles.AuthorText>
          <MediaItemDescription
            description={item.content}
          />
        </Styles.ContentWrapper>
      )}
      contentContainerStyle={{
        padding: metrics.mediumSize,
      }}
      ListHeaderComponent={() => (
        <Styles.ReviewsText>
          {t(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_REVIEW)}
        </Styles.ReviewsText>
      )}
      ItemSeparatorComponent={() => <Styles.Separator />}
      data={route.params.reviews}
    />
  );
};

export default Reviews;
