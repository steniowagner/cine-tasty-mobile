/* eslint-disable import/first */
import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { TMDBImageQualityProvider } from 'providers/tmdb-image-quality/TMDBImageQuality';
import theme from 'styles/theme';

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
  });

  afterEach(cleanup);

  it('should render the loading layout when is mounted', () => {
    const { getByTestId } = render(renderProfileImage());

    expect(getByTestId('profile-image')).not.toBeNull();

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toBe('account');
  });

  it('should render only the image after the image be loaded', () => {
    const { getByTestId } = render(renderProfileImage());

    act(() => {
      jest.runAllTimers();
    });

    fireEvent(getByTestId('profile-image'), 'onLoad');

    expect(getByTestId('profile-image')).not.toBeNull();

    try {
      expect(getByTestId('fallback-image-wrapper'));
    } catch (err) {
      expect(err.message.includes('No instances found')).toBe(true);
    }

    try {
      expect(getByTestId('icon'));
    } catch (err) {
      expect(err.message).toEqual('No instances found');
    }
  });

  it("should render the error layout when there's some error when try to load the image", () => {
    const { getByTestId } = render(renderProfileImage());

    fireEvent(getByTestId('profile-image'), 'onError');

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toBe('image-off');
  });

  it('should render the error layout when the image URL is null', () => {
    const { getByTestId } = render(renderProfileImage(null));

    expect(getByTestId('fallback-image-wrapper')).not.toBeNull();

    expect(getByTestId('icon').props.name).toBe('image-off');
  });
});
