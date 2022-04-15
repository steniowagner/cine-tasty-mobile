import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {ANIMATION_DURATION} from '@src/hooks/useLoadListItemImage';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {dark as theme} from '@styles/themes/dark';

import ProfileImage from './ProfileImage';

const renderProfileImage = (profileImage?: string) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <ProfileImage profileImage={profileImage} />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<ProfileImage />', () => {
  const elements = {
    profileImage: (api: RenderAPI) => api.queryByTestId('profile-image'),
    fallbackImageWrapper: (api: RenderAPI) =>
      api.queryByTestId('fallback-profile-image-wrapper'),
    iconAccount: (api: RenderAPI) => api.queryByTestId('icon-account'),
    iconImageOff: (api: RenderAPI) => api.queryByTestId('icon-image-off'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    setupTimeTravel();
  });

  afterEach(cleanup);

  describe('Success path', () => {
    it('should render the loading-state when is mounted', async () => {
      const component = render(renderProfileImage('SOME_IMAGE'));
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.fallbackImageWrapper(component)).not.toBeNull();
      expect(elements.iconAccount(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render only the image after the image be loaded', async () => {
      const component = render(renderProfileImage('SOME_IMAGE'));
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.profileImage(component), 'onLoad');
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.fallbackImageWrapper(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Error path', () => {
    it('should render the error-state when there is some error when try to load the image', async () => {
      const component = render(renderProfileImage());
      act(() => {
        jest.runAllTimers();
      });
      fireEvent(elements.profileImage(component), 'onError');
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.fallbackImageWrapper(component)).not.toBeNull();
      expect(elements.iconImageOff(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render the error-state when the image URL is undefined', async () => {
      const component = render(renderProfileImage());
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.fallbackImageWrapper(component)).not.toBeNull();
      expect(elements.iconImageOff(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should render the error-state when the image URL is an empty string', async () => {
      const component = render(renderProfileImage(''));
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.fallbackImageWrapper(component)).not.toBeNull();
      expect(elements.iconImageOff(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });
});
