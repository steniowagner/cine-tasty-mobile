import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';
import { MockList, IMocks } from 'graphql-tools';

import { dark } from 'styles/themes';

import AutoMockProvider from '../../../../../../__mocks__/AutoMockedProvider';
import MockedNavigation from '../../../../../../__mocks__/MockedNavigator';
import { setupTimeTravel } from '../../../../../../__mocks__/timeTravel';

import FamousDetail from './FamousDetail';

const route = {
  params: {
    id: 123,
  },
};

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
    voteAverage: -14.422278991118858,
    posterPath: 'Hello World',
    mediaType: 'Hello World',
    voteCount: -54.58661716105482,
    title: 'Hello World',
    id: 84,
    __typename: 'CastMovie',
  },
  {
    voteAverage: -61.20140395771752,
    posterPath: 'Hello World',
    mediaType: 'Hello World',
    voteCount: -45.105633420623725,
    title: 'Hello World',
    id: 39,
    __typename: 'CastMovie',
  },
];

const tvCast = [
  {
    voteAverage: 79.24046692747518,
    posterPath: 'Hello World',
    mediaType: 'Hello World',
    voteCount: -50.84916555615129,
    name: 'Hello World',
    id: -94,
    __typename: 'CastTVShow',
  },
  {
    voteAverage: 92.31814886121063,
    posterPath: 'Hello World',
    mediaType: 'Hello World',
    voteCount: 1.4805898520850604,
    name: 'Hello World',
    id: 25,
    __typename: 'CastTVShow',
  },
];

const renderFamousDetail = (mockResolvers?: IMocks) => {
  const FamousDetailScreen = () => (
    <ThemeProvider theme={dark}>
      <AutoMockProvider mockResolvers={mockResolvers}>
        <FamousDetail route={route} />
      </AutoMockProvider>
    </ThemeProvider>
  );

  return <MockedNavigation component={FamousDetailScreen} />;
};

describe('Testing <FamousDetail />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render the loading-state when the screen is mounted', () => {
    const { getByTestId } = render(renderFamousDetail());

    expect(getByTestId('famous-detail-loading')).not.toBeNull();

    act(() => {
      jest.runAllTimers();
    });
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

    const { queryByTestId, getByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('famous-detail-loading')).toBeNull();

    expect(getByTestId('background-image-wrapper')).not.toBeNull();

    expect(queryByTestId('death-day-info')).not.toBeNull();

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

  it('should not render the movie-cast section when the movie-cast field is an empty array', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        moviesCast: [],
      }),
    };

    const { queryByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('movies-cast')).toBeNull();
  });

  it('should not render the movie-cast section when the movie-cast field is null', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        moviesCast: null,
      }),
    };

    const { queryByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('movies-cast')).toBeNull();
  });

  it('should not render the tv-cast section when the tv-cast field is an empty array', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        tvCast: [],
      }),
    };

    const { queryByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('tv-cast')).toBeNull();
  });

  it('should not render the tv-cast section when the tv-cast field is null', () => {
    const mockResolvers = {
      Person: () => ({
        ...person,
        tvCast: null,
      }),
    };

    const { queryByTestId } = render(renderFamousDetail(mockResolvers));

    act(() => {
      jest.runAllTimers();
    });

    expect(queryByTestId('tv-cast')).toBeNull();
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
    const mockResolversWithNullPerson = {
      Person: () => new Error(),
    };

    const { queryByTestId, getByTestId } = render(
      renderFamousDetail(mockResolversWithNullPerson),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('advise-wrapper')).not.toBeNull();

    expect(queryByTestId('famous-detail-loading')).toBeNull();

    expect(queryByTestId('background-image-wrapper')).toBeNull();

    expect(queryByTestId('death-day-info')).toBeNull();

    expect(queryByTestId('scroll-content')).toBeNull();

    expect(queryByTestId('movies-cast')).toBeNull();

    expect(queryByTestId('tv-cast')).toBeNull();
  });
});
