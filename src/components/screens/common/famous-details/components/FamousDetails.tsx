import React, {useLayoutEffect} from 'react';
import {ScrollView} from 'react-native';
import {withTheme} from 'styled-components/native';

import {
  ExpansibleTextSection,
  MediaHorizontalList,
  ImagesList,
  HeaderBackButton,
  Advise,
  StatusBarStyled,
} from '@components';

import {FamousDetailStackProps} from '../routes/route-params-types';
import HeaderInfo from './header/header-info/HeaderInfo';
import useFamousDetail from './useFamousDetails';
import * as Styles from './FamousDetails.styles';
import DeathDay from './death-day/DeathDay';

export const FamousDetails = withTheme((props: FamousDetailStackProps) => {
  const famousDetail = useFamousDetail({
    id: props.route.params.id,
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => props.navigation.goBack()} />
      ),
    });
  }, [props.navigation]);

  if (famousDetail.hasError) {
    return (
      <Advise
        description={famousDetail.texts.advise.description}
        suggestion={famousDetail.texts.advise.suggestion}
        title={famousDetail.texts.advise.title}
        icon="alert-box"
      />
    );
  }

  return (
    <>
      <StatusBarStyled />
      <ScrollView testID="scroll-content">
        <HeaderInfo
          knownForDepartment={famousDetail.famous?.knownForDepartment}
          profileImage={props.route.params.profileImage}
          placeOfBirth={famousDetail.famous?.placeOfBirth}
          birthDate={famousDetail.famous?.birthday}
          isLoading={famousDetail.isLoading}
          name={props.route.params.name}
        />
        {!!famousDetail.famous?.deathday && (
          <DeathDay deathDate={famousDetail.famous.deathday} />
        )}
        <Styles.BiographySectionWrapper testID="biography-section">
          <ExpansibleTextSection
            sectionTitle={famousDetail.texts.biography}
            text={famousDetail.famous?.biography}
            isLoading={famousDetail.isLoading}
          />
        </Styles.BiographySectionWrapper>
        {!!famousDetail.famous && (
          <>
            {!!famousDetail.famous.images && (
              <ImagesList
                images={famousDetail.famous.images}
                orientation="PORTRAIT"
              />
            )}
            {!!famousDetail.famous.moviesCast && (
              <MediaHorizontalList
                title={famousDetail.texts.castMoviesSection}
                dataset={famousDetail.famous.moviesCast}
                type="MOVIE"
              />
            )}
            {!!famousDetail.famous.tvCast && (
              <MediaHorizontalList
                title={famousDetail.texts.castTvShowSection}
                dataset={famousDetail.famous.tvCast}
                type="TV_SHOW"
              />
            )}
          </>
        )}
      </ScrollView>
    </>
  );
});
