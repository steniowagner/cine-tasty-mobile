import React from 'react';
import {Image, Alert} from 'react-native';
import {MockedResponse, MockedProvider} from '@apollo/client/testing';
import {
  cleanup,
  render,
  act,
  RenderAPI,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import {InMemoryCache} from '@apollo/client';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import * as mockFamousDetails from '@mocks/fixtures/famous-details';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {AlertMessageProvider} from '@providers';
import {Routes} from '@routes/routes';
import {Translations} from '@i18n/tags';

jest.spyOn(Alert, 'alert');

import {FamousDetails} from './FamousDetails';

const USER_ID = 123;

const renderFamousDetails = (
  mockResolvers?: readonly MockedResponse<Record<string, any>>[],
  navigate = jest.fn(),
  goBack = jest.fn(),
) => {
  const FamousDetailScreen = ({navigation}) => (
    <MockedProvider
      mocks={mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <TMDBImageQualityProvider>
        <AlertMessageProvider>
          <FamousDetails
            navigation={{...navigation, navigate, goBack}}
            route={{
              name: Routes.Famous.DETAILS,
              key: `${Routes.Famous.DETAILS}-key`,
              params: {
                profileImage: 'PROFILE_IMAGE',
                name: 'NAME',
                id: USER_ID,
              },
            }}
          />
        </AlertMessageProvider>
      </TMDBImageQualityProvider>
    </MockedProvider>
  );

  return <MockedNavigation component={FamousDetailScreen} />;
};

describe('<FamousDetail />', () => {
  const elements = {
    headerBackButton: (api: RenderAPI) =>
      api.queryByTestId('header-back-button'),
    adviseWrapper: (api: RenderAPI) => api.queryByTestId('advise-wrapper'),
    adviseTitle: (api: RenderAPI) => api.queryByTestId('advise-title'),
    adviseDescription: (api: RenderAPI) =>
      api.queryByTestId('advise-description'),
    adviseSuggestion: (api: RenderAPI) =>
      api.queryByTestId('advise-suggestion'),
    backgroundImage: (api: RenderAPI) =>
      api.queryByTestId('background-image-wrapper'),
    scrollableContent: (api: RenderAPI) => api.queryByTestId('scroll-content'),
    headerInfo: (api: RenderAPI) => api.queryByTestId('header-info'),
    deathDay: (api: RenderAPI) => api.queryByTestId('death-day-wrapper'),
    biography: (api: RenderAPI) => api.queryByTestId('biography-section'),
    imagesList: (api: RenderAPI) => api.queryByTestId('images-list'),
    moviesCast: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-MOVIE'),
    tvCast: (api: RenderAPI) =>
      api.queryByTestId('media-horizontal-list-TV_SHOW'),
    loadingHeader: (api: RenderAPI) =>
      api.queryByTestId('loading-header-placeholder'),
    loadingBiography: (api: RenderAPI) =>
      api.queryByTestId('loading-expansible-text-section'),
    loadingProfileImage: (api: RenderAPI) =>
      api.queryByTestId('fallback-profile-image-wrapper'),
    profileImage: (api: RenderAPI) => api.queryByTestId('profile-image'),
    sectionsTitle: (api: RenderAPI) => api.queryAllByTestId('section-title'),
  };

  beforeAll(() => {
    jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (_: string, onSuccess: (width: number, height: number) => void) => {
          onSuccess(100, 100);
        },
      );
  });

  afterEach(cleanup);

  describe('Renders correctly', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render correctly when it has all the data', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withBiography: true,
          withMoviesCast: true,
          withDeathDay: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.imagesList(component)).not.toBeNull();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.deathDay(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.imagesList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "deathDay" is undefined', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withDeathDay: false,
          withBiography: true,
          withMoviesCast: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.imagesList(component)).not.toBeNull();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.imagesList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "moviesCast" and "deathday" are undefined', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withDeathDay: false,
          withMoviesCast: false,
          withBiography: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.imagesList(component)).not.toBeNull();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.moviesCast(component)).toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.imagesList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "moviesCast", "deathday" and "images" are undefined', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withDeathDay: false,
          withMoviesCast: false,
          withImages: false,
          withBiography: true,
          withTVCast: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.moviesCast(component)).toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "moviesCast", "deathday", "images" and "tvCast" are undefined', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withDeathDay: false,
          withMoviesCast: false,
          withImages: false,
          withTVCast: false,
          withBiography: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.moviesCast(component)).toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.tvCast(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render the "cast-movies-section-text" correctly when the "moviesCasts" is an empty array', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withMoviesCast: true,
          withTVCast: true,
          emptyCastMovies: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.moviesCast(component)).not.toBeNull();
      });
      expect(elements.sectionsTitle(component)[1].children[0]).toEqual(
        `${Translations.Tags.FAMOUS_DETAIL_CAST_MOVIES} (0)`,
      );
      await waitFor(() => {});
    });

    it('should render the "cast-tv-section-text" correctly when the "tvCasts" is an empty array', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withMoviesCast: true,
          withTVCast: true,
          emptyCastTV: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      await waitFor(() => {
        expect(elements.moviesCast(component)).not.toBeNull();
      });
      expect(elements.sectionsTitle(component)[2].children[0]).toEqual(
        `${Translations.Tags.FAMOUS_DETAIL_CAST_TV} (0)`,
      );
      await waitFor(() => {});
    });
  });

  describe('Showing the "language-alert-message"', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
    });

    it('should call the "Alert.alert" with the correct params when the "biography" is an empty string', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {
          withBiography: false,
          withMoviesCast: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      fireEvent(elements.profileImage(component), 'onLoad');
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledTimes(1);
      });
      expect((Alert.alert as jest.Mock).mock.calls[0][0]).toEqual(
        Translations.Tags.LANGUAGE_WARNING_FAMOUS_TITLE,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][1]).toEqual(
        Translations.Tags.LANGUAGE_WARNING_FAMOUS_DESCRIPTION,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][2][0].text).toEqual(
        Translations.Tags.LANGUAGE_WARNING_FAMOUS_POSITIVE_ACTION,
      );
      expect((Alert.alert as jest.Mock).mock.calls[0][3].cancelable).toEqual(
        false,
      );
    });
  });

  describe('Loading State', () => {
    it('should render the "loading-state" correctly when is loading', async () => {
      const goBack = jest.fn();
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {},
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.result,
        },
      ];
      const component = render(
        renderFamousDetails(resolvers, undefined, goBack),
      );
      expect(elements.loadingProfileImage(component)).not.toBeNull();
      expect(elements.loadingHeader(component)).not.toBeNull();
      expect(elements.loadingBiography(component)).not.toBeNull();
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.moviesCast(component)).toBeNull();
      expect(elements.tvCast(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Error State', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it('should render the "Advise" component correctly when a network-error happens during the request', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {},
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithNetworkError,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.adviseWrapper(component)).not.toBeNull();
      expect(elements.adviseTitle(component)).not.toBeNull();
      expect(elements.adviseTitle(component).children[0]).toEqual(
        Translations.Tags.FAMOUS_DETAIL_ERROR_TITLE,
      );
      expect(elements.adviseDescription(component)).not.toBeNull();
      expect(elements.adviseDescription(component).children[0]).toEqual(
        Translations.Tags.FAMOUS_DETAIL_ERROR_DESCRIPTION,
      );
      expect(elements.adviseSuggestion(component)).not.toBeNull();
      expect(elements.adviseSuggestion(component).children[0]).toEqual(
        Translations.Tags.FAMOUS_DETAIL_ERROR_SUGGESTION,
      );
      expect(elements.backgroundImage(component)).toBeNull();
      expect(elements.scrollableContent(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render the "Advise" component correctly when a graphql-error happens during the request', async () => {
      const queryResult = mockFamousDetails.famousDetailsResolvers(
        {language: 'EN', id: USER_ID},
        {},
      );
      const resolvers = [
        {
          ...queryResult.request,
          ...queryResult.responseWithGraphQLError,
        },
      ];
      const component = render(renderFamousDetails(resolvers));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.adviseWrapper(component)).not.toBeNull();
      expect(elements.adviseTitle(component)).not.toBeNull();
      expect(elements.adviseTitle(component).children[0]).toEqual(
        Translations.Tags.FAMOUS_DETAIL_ERROR_TITLE,
      );
      expect(elements.adviseDescription(component)).not.toBeNull();
      expect(elements.adviseDescription(component).children[0]).toEqual(
        Translations.Tags.FAMOUS_DETAIL_ERROR_DESCRIPTION,
      );
      expect(elements.adviseSuggestion(component)).not.toBeNull();
      expect(elements.adviseSuggestion(component).children[0]).toEqual(
        Translations.Tags.FAMOUS_DETAIL_ERROR_SUGGESTION,
      );
      expect(elements.backgroundImage(component)).toBeNull();
      expect(elements.scrollableContent(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Pressing the "Back-button"', () => {
    describe('When a "network-error" happened', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should call "navigation.goBack" when the user press the "back-button"', async () => {
        const goBack = jest.fn();
        const queryResult = mockFamousDetails.famousDetailsResolvers(
          {language: 'EN', id: USER_ID},
          {},
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.responseWithNetworkError,
          },
        ];
        const component = render(
          renderFamousDetails(resolvers, undefined, goBack),
        );
        await waitFor(() => {
          expect(elements.adviseWrapper(component)).not.toBeNull();
        });
        expect(elements.headerBackButton(component)).not.toBeNull();
        expect(goBack).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.headerBackButton(component));
        expect(goBack).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });
    });

    describe('When a "graphql-error" happened', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should call "navigation.goBack" when the user press the "back-button"', async () => {
        const goBack = jest.fn();
        const queryResult = mockFamousDetails.famousDetailsResolvers(
          {language: 'EN', id: USER_ID},
          {},
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.responseWithGraphQLError,
          },
        ];
        const component = render(
          renderFamousDetails(resolvers, undefined, goBack),
        );
        await waitFor(() => {
          expect(elements.adviseWrapper(component)).not.toBeNull();
        });
        expect(elements.headerBackButton(component)).not.toBeNull();
        expect(goBack).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.headerBackButton(component));
        expect(goBack).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });
    });

    describe('When successfuly retrieve the data', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it('should call "navigation.goBack" when the user press the "back-button"', async () => {
        const goBack = jest.fn();
        const queryResult = mockFamousDetails.famousDetailsResolvers(
          {language: 'EN', id: USER_ID},
          {},
        );
        const resolvers = [
          {
            ...queryResult.request,
            ...queryResult.result,
          },
        ];
        const component = render(
          renderFamousDetails(resolvers, undefined, goBack),
        );
        await waitFor(() => {
          expect(elements.backgroundImage(component)).not.toBeNull();
        });
        expect(elements.headerBackButton(component)).not.toBeNull();
        expect(goBack).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.headerBackButton(component));
        expect(goBack).toHaveBeenCalledTimes(1);
      });
    });
  });
});
