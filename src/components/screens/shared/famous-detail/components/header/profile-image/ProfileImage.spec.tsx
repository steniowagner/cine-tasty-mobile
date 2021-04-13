/* eslint-disable import/first */
import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ANIMATION_DURATION } from '@src/hooks/useLoadListItemImage';
import theme from '@styles/theme';

import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import ProfileImage from './ProfileImage';

const renderProfileImage = (profileImage = 'profileImage') => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <ProfileImage profileImage={profileImage} />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <ProfileImage />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupTimeTravel();
  });

  afterEach(cleanup);

  it('should render the loading layout when is mounted', () => {
    const { getByTestId } = render(renderProfileImage());

    expect(getByTestId('profile-image')).not.toBeNull();

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-account')).not.toBeNull();
  });

  it('should render only the image after the image be loaded', () => {
    const { queryByTestId, getByTestId } = render(renderProfileImage());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent(getByTestId('profile-image'), 'onLoad');

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(getByTestId('profile-image')).not.toBeNull();

    expect(queryByTestId('fallback-image-wrapper')).toBeNull();
  });

  it("should render the error layout when there's some error when try to load the image", () => {
    const { getByTestId } = render(renderProfileImage());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent(getByTestId('profile-image'), 'onError');

    act(() => {
      timeTravel(ANIMATION_DURATION);
    });

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image-off')).not.toBeNull();
  });

  it('should render the error layout when the image URL is null', () => {
    const { getByTestId } = render(renderProfileImage(null));

    act(() => {
      jest.runAllTimers();
    });

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon-image-off')).not.toBeNull();
  });
});
