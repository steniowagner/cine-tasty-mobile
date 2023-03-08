jest.unmock('react-native-reanimated');
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

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import * as mockFamousDetails from '@mocks/fixtures/famous-details';
import possibleTypes from '@graphql/possibleTypes.json';
import MockedNavigation from '@mocks/MockedNavigator';
import {AlertMessageProvider} from '@providers';
import {Routes} from '@routes/routes';
import {Translations} from '@i18n/tags';

import {FamousDetails} from './FamousDetails';

jest.spyOn(Alert, 'alert');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

const USER_ID = 123;

type RenderFamousDetailsProps = {
  mockResolvers?: readonly MockedResponse<Record<string, any>>[];
  navigate?: jest.Mock;
  goBack?: jest.Mock;
};

const renderFamousDetails = (props: RenderFamousDetailsProps) => {
  const FamousDetailScreen = ({navigation}) => (
    <MockedProvider
      mocks={props.mockResolvers}
      defaultOptions={{
        watchQuery: {fetchPolicy: 'no-cache'},
        query: {fetchPolicy: 'no-cache'},
      }}
      cache={
        new InMemoryCache({
          possibleTypes,
        })
      }>
      <TMDBImageQualitiesProvider>
        <AlertMessageProvider>
          <FamousDetails
            navigation={{
              ...navigation,
              navigate: props.navigate,
              goBack: props.goBack,
            }}
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
      </TMDBImageQualitiesProvider>
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
      api.queryByTestId('profile-image-tmdb-fallback-image'),
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

    afterEach(cleanup);

    it('should render correctly when the data is "loaded"', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {
          withBiography: true,
          withMoviesCast: true,
          withDeathDay: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const component = render(renderFamousDetails({mockResolvers}));
      fireEvent(elements.profileImage(component), 'onLoad');
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
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.imagesList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "deathDay" is "undefined"', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {
          withDeathDay: false,
          withBiography: true,
          withMoviesCast: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const component = render(renderFamousDetails({mockResolvers}));
      fireEvent(elements.profileImage(component), 'onLoad');
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
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.imagesList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "moviesCast" and "deathday" are "undefined"', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {
          withBiography: true,
          withImages: true,
          withTVCast: true,
        },
      );
      const component = render(renderFamousDetails({mockResolvers}));
      fireEvent(elements.profileImage(component), 'onLoad');
      await waitFor(() => {
        expect(elements.imagesList(component)).not.toBeNull();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.imagesList(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "moviesCast", "deathday" and "images" are undefined', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {
          withBiography: true,
          withTVCast: true,
        },
      );
      const component = render(renderFamousDetails({mockResolvers}));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "moviesCast", "deathday", "images" and "tvCast" are undefined', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {
          withBiography: true,
        },
      );
      const component = render(renderFamousDetails({mockResolvers}));
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loadingProfileImage(component)).toBeNull();
      expect(elements.loadingHeader(component)).toBeNull();
      expect(elements.loadingBiography(component)).toBeNull();
      expect(elements.adviseWrapper(component)).toBeNull();
      expect(elements.moviesCast(component)).not.toBeNull();
      expect(elements.deathDay(component)).toBeNull();
      expect(elements.imagesList(component)).toBeNull();
      expect(elements.tvCast(component)).not.toBeNull();
      expect(elements.scrollableContent(component)).not.toBeNull();
      expect(elements.biography(component)).not.toBeNull();
      expect(elements.headerInfo(component)).not.toBeNull();
      expect(elements.headerBackButton(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render the "cast-movies-section-text" correctly when the "moviesCasts" is an empty array', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {},
      );
      const component = render(renderFamousDetails({mockResolvers}));
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
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {},
      );
      const component = render(renderFamousDetails({mockResolvers}));
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

    afterEach(cleanup);

    it('should call the "Alert.alert" with the correct params when the "biography" is an empty string', async () => {
      const mockResolvers = mockFamousDetails.makeSuccessResolver(
        {language: 'EN', id: USER_ID},
        {
          withBiography: false,
        },
      );
      const component = render(renderFamousDetails({mockResolvers}));
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
    it('should render the "loading-state" correctly when the data is loading', async () => {
      const mockResolvers = mockFamousDetails.makeNetworkErrorResolver(
        {language: 'EN', id: USER_ID},
        {},
      );
      const component = render(renderFamousDetails({mockResolvers}));
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

    it('should render the "Advise" component correctly when a network-error happens', async () => {
      const mockResolvers = mockFamousDetails.makeNetworkErrorResolver(
        {language: 'EN', id: USER_ID},
        {},
      );
      const component = render(renderFamousDetails({mockResolvers}));
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
      expect(elements.scrollableContent(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render the "Advise" component correctly when a graphql-error happens', async () => {
      const mockResolvers = mockFamousDetails.makeGraphQLErrorResolver(
        {language: 'EN', id: USER_ID},
        {},
      );
      const component = render(renderFamousDetails({mockResolvers}));
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
      expect(elements.scrollableContent(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Pressing the "Back-button"', () => {
    describe('When successfuly retrieve the data', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should call "navigation.goBack" when the user press the "back-button"', async () => {
        const goBack = jest.fn();
        const mockResolvers = mockFamousDetails.makeSuccessResolver(
          {language: 'EN', id: USER_ID},
          {},
        );
        const component = render(renderFamousDetails({mockResolvers, goBack}));
        expect(elements.headerBackButton(component)).not.toBeNull();
        expect(goBack).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.headerBackButton(component));
        expect(goBack).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });
    });

    describe('When a "network-error" happened', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(cleanup);

      it('should call "navigation.goBack" when the user press the "back-button"', async () => {
        const goBack = jest.fn();
        const mockResolvers = mockFamousDetails.makeNetworkErrorResolver(
          {language: 'EN', id: USER_ID},
          {},
        );
        const component = render(renderFamousDetails({mockResolvers, goBack}));
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

      afterEach(cleanup);

      it('should call "navigation.goBack" when the user press the "back-button"', async () => {
        const goBack = jest.fn();
        const mockResolvers = mockFamousDetails.makeGraphQLErrorResolver(
          {language: 'EN', id: USER_ID},
          {},
        );
        const component = render(renderFamousDetails({mockResolvers, goBack}));
        expect(elements.headerBackButton(component)).not.toBeNull();
        expect(goBack).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.headerBackButton(component));
        expect(goBack).toHaveBeenCalledTimes(1);
        await waitFor(() => {});
      });
    });
  });
});
