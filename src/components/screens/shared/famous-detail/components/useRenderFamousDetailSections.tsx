/* eslint-disable camelcase */
/* eslint-disable react/display-name */
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import SimplifiedMediaListItem from '@components/common/simplified-media-list-item/SimplifiedMediaListItem';
import ImagesList from '@components/common/images-list/ImagesList';
import Section from '@components/common/section/Section';
import * as SchemaTypes from '@schema-types';
import * as TRANSLATIONS from '@i18n/tags';
import { Routes } from '@routes/routes';

import { FamousDetailNavigationProp } from '../routes/route-params-types';
import * as Styles from './FamousDetail.styles';

type UseRenderFamousDetailSectionsProps = {
  navigation: FamousDetailNavigationProp;
};

const useRenderFamousDetailSections = ({
  navigation,
}: UseRenderFamousDetailSectionsProps) => {
  const { t } = useTranslation();

  const renderImagesSection = useCallback((images: string[]) => {
    const sectionImagesTitle = images.length > 0
      ? t(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)
      : `${t(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)} (0)`;

    return (
      <Styles.ImagesSectionWrapper>
        <Section
          title={sectionImagesTitle}
          noMarginTop
        >
          <ImagesList
            images={images}
          />
        </Section>
      </Styles.ImagesSectionWrapper>
    );
  }, []);

  const renderMovieCastSection = useCallback(
    (movieCast: SchemaTypes.GetFamousDetail_person_moviesCast[]) => {
      const sectionCastMoviesTitle = movieCast.length > 0
        ? t(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)
        : `${t(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)} (0)`;

      return (
        <Section
          title={sectionCastMoviesTitle}
        >
          <FlatList
            renderItem={({ item, index }) => (
              <SimplifiedMediaListItem
                onPress={() => navigation.push(Routes.Movie.DETAILS, {
                  voteAverage: item.voteAverage,
                  posterPath: item.posterPath,
                  voteCount: item.voteCount,
                  title: item.title,
                  id: item.id,
                })}
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                image={item.posterPath}
                isFirst={index === 0}
                title={item.title}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsHorizontalScrollIndicator={false}
            testID="movies-cast"
            data={movieCast}
            horizontal
          />
        </Section>
      );
    },
    [],
  );

  const renderTVShowCastSection = useCallback(
    (tvShowCast: SchemaTypes.GetFamousDetail_person_tvCast[]) => {
      const sectionCastTVShowsTitle = tvShowCast.length > 0
        ? t(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)
        : `${t(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)} (0)`;

      return (
        <Section
          title={t(sectionCastTVShowsTitle)}
        >
          <FlatList
            renderItem={({ item, index }) => (
              <SimplifiedMediaListItem
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                isFirst={index === 0}
                onPress={() => navigation.push(Routes.TVShow.DETAILS, {
                  voteAverage: item.voteAverage,
                  posterPath: item.posterPath,
                  voteCount: item.voteCount,
                  title: item.name,
                  id: item.id,
                })}
                image={item.posterPath}
                title={item.name}
              />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            data={tvShowCast}
            testID="tv-cast"
            horizontal
          />
        </Section>
      );
    },
    [],
  );

  return {
    renderTVShowCastSection,
    renderMovieCastSection,
    renderImagesSection,
  };
};

export default useRenderFamousDetailSections;
