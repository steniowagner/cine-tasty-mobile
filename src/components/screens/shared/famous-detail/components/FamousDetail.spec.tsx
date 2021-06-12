import React from 'react';
import { cleanup, render, act } from '@testing-library/react-native';
import { IMocks } from 'graphql-tools';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import AutoMockProvider from '@mocks/AutoMockedProvider';
import MockedNavigation from '@mocks/MockedNavigator';
import { ThemeContextProvider } from '@providers';
import * as TRANSLATIONS from '@i18n/tags';

import FamousDetail from './FamousDetail';

const person = {
  __typename: 'Person',
  images: ['image01', 'image02', 'image03'],
  profilePath: 'image01',
  knownForDepartment: 'knownForDepartment',
  placeOfBirth: 'placeOfBirth',
  biography: 'biography',
  birthday: 'birthday',
  name: 'name',
  id: 123,
};

const movieCast = [
  {
    voteAverage: 1,
    posterPath: 'Hello World',
    voteCount: 1,
    title: 'Hello World',
    id: 1,
    __typename: 'CastMovie',
  },
  {
    voteAverage: 1,
    posterPath: 'Hello World',
    voteCount: 1,
    title: 'Hello World',
    id: 2,
    __typename: 'CastMovie',
  },
];

const tvCast = [
  {
    voteAverage: 1,
    posterPath: 'Hello World',
    voteCount: 1,
    name: 'Hello World',
    id: 1,
    __typename: 'CastTVShow',
  },
  {
    voteAverage: 1,
    posterPath: 'Hello World',
    voteCount: 2,
    name: 'Hello World',
    id: 2,
    __typename: 'CastTVShow',
  },
];

const renderFamousDetail = (mockResolvers?: IMocks) => {
  const FamousDetailScreen = ({ navigation }) => (
    <TMDBImageQualityProvider>
      <ThemeContextProvider>
        <AutoMockProvider mockResolvers={mockResolvers}>
          <FamousDetail
            navigation={navigation}
            route={{
              params: {
                profileImage: 'profileImage',
                name: 'name',
                id: 123,
              },
            }}
          />
        </AutoMockProvider>
      </ThemeContextProvider>
    </TMDBImageQualityProvider>
  );

  return <MockedNavigation component={FamousDetailScreen} />;
};

describe('Testing <FamousDetail />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('should render the loading-state correctly', () => {
    const { queryByText, getByText, getByTestId } = render(renderFamousDetail());

    expect(getByTestId('name-text').children[0]).toEqual(person.name);

    expect(getByTestId('loading-header-placeholder')).not.toBeNull();

    expect(getByTestId('biography-section')).not.toBeNull();

    expect(getByTestId('profile-image')).not.toBeNull();

    expect(getByText(TRANSLATIONS.FAMOUS_DETAIL_BIOGRAPGY)).not.toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)).toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)).toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)).toBeNull();
  });

  it('should render the content correctly when all the data is returned', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        deathday: 'deathday',
        movieCast,
        tvCast,
      }),
    };

    const { queryByTestId, getByText, getByTestId } = render(
      renderFamousDetail(mockResolvers),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('loading-header-placeholder')).toBeNull();

    expect(getByTestId('background-image-wrapper')).not.toBeNull();

    expect(getByTestId('name-text').children[0]).toEqual(person.name);

    expect(queryByTestId('death-day-info')).not.toBeNull();

    expect(getByText(TRANSLATIONS.FAMOUS_DETAIL_BIOGRAPGY)).not.toBeNull();

    expect(getByText(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)).not.toBeNull();

    expect(getByText(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)).not.toBeNull();

    expect(getByText(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)).not.toBeNull();

    expect(getByTestId('scroll-content')).not.toBeNull();

    expect(getByTestId('movies-cast')).not.toBeNull();

    expect(getByTestId('tv-cast')).not.toBeNull();
  });

  it("should not render the death-day component when the deathDay field doesn't exist", () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        deathday: null,
      }),
    };

    const { queryByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('death-day-info')).toBeNull();
  });

  it('should render correctly the movie-cast section when the movie-cast field is an empty array', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        moviesCast: [],
      }),
    };

    const { getByText } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText(TRANSLATIONS.FAMOUS_DETAIL_BIOGRAPGY)).not.toBeNull();

    expect(getByText(`${TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES} (0)`)).not.toBeNull();
  });

  it('should render the tv-cast section correctly when the tv-cast field is an empty array', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        tvCast: [],
      }),
    };

    const { getByText } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText(`${TRANSLATIONS.FAMOUS_DETAIL_CAST_TV} (0)`)).not.toBeNull();
  });

  it('should render just a "-" on the biography section when the biography text is an empty string', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        biography: '',
      }),
    };

    const { getByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').children[0]).toEqual('-');
  });

  it('should render just a "-" on the biography section when the biography text is null', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        biography: null,
      }),
    };

    const { getByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('description-text').children[0]).toEqual('-');
  });

  it('should render the Advise component when some error occur', () => {
    const mockResolvers = {
      Person: () => new Error(),
    };

    const { queryByText, queryByTestId, getByText, getByTestId } = render(
      renderFamousDetail(mockResolvers),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('advise-wrapper')).not.toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_ERROR_DESCRIPTION)).not.toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_ERROR_SUGGESTION)).not.toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_ERROR_TITLE)).not.toBeNull();

    expect(queryByTestId('biography-section')).toBeNull();

    expect(queryByTestId('profile-image')).toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_BIOGRAPGY)).toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_IMAGES)).toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_CAST_MOVIES)).toBeNull();

    expect(queryByText(TRANSLATIONS.FAMOUS_DETAIL_CAST_TV)).toBeNull();

    expect(queryByTestId('background-image-wrapper')).toBeNull();

    expect(queryByTestId('death-day-info')).toBeNull();

    expect(queryByTestId('scroll-content')).toBeNull();

    expect(queryByTestId('movies-cast')).toBeNull();

    expect(queryByTestId('tv-cast')).toBeNull();
  });
});
