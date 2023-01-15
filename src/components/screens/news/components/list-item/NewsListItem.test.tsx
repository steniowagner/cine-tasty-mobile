jest.unmock('react-native-reanimated');

import React from 'react';
import {Linking} from 'react-native';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import NewsListItem from './NewsListItem';
import {act} from 'react-test-renderer';

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn((url: string) => Promise.resolve(url)),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
}));

const renderNewsListItem = (
  url: string = 'SOME_URL',
  withRTL: boolean = false,
) => (
  <ThemeProvider theme={theme}>
    <NewsListItem
      withRTL={withRTL}
      source="SOME_SOURCE"
      image="SOME_IMAGE"
      text="SOME_TEXT"
      date="SOME_DATE"
      url={url}
    />
  </ThemeProvider>
);

describe('<NewsListItem />', () => {
  const elements = {
    wrapperButton: (api: RenderAPI) =>
      api.queryByTestId('news-list-item-wrapper'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  it('should call the "Linking.openURL" with the correct params when the user presses the list-item', () => {
    const url = 'MY_URL.com';
    const component = render(renderNewsListItem(url));
    fireEvent.press(elements.wrapperButton(component));
    act(() => {
      jest.runAllTimers();
    });
    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(Linking.canOpenURL).toHaveBeenCalledWith(url);
    expect(Linking.openURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith(url);
  });

  it('should call the "Linking.openURL" when the "Linking.canOpenURL" returns false', () => {
    const url = 'MY_URL.com';
    const canOpenURLSpy = jest.spyOn(Linking, 'canOpenURL');
    canOpenURLSpy.mockResolvedValue(false);
    const component = render(renderNewsListItem(url));
    fireEvent.press(elements.wrapperButton(component));
    act(() => {
      jest.runAllTimers();
    });
    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(Linking.canOpenURL).toHaveBeenCalledWith(url);
    expect(Linking.openURL).toHaveBeenCalledTimes(0);
  });
});
