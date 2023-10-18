jest.unmock('react-native-reanimated');

import React from 'react';
import { Linking } from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark, light } from '@styles/themes';

import { NewsListItem } from './NewsListItem';
import { act } from 'react-test-renderer';

jest.mock('react-native/Libraries/Linking/Linking');

const renderNewsListItem = (url?: string, theme = dark) => (
  <ThemeProvider theme={theme}>
    <NewsListItem
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
      api.getByTestId('news-list-item-wrapper'),
    sourceText: (api: RenderAPI) => api.getByTestId('source-text'),
    newsText: (api: RenderAPI) => api.getByTestId('news-text'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  describe('Styles', () => {
    describe('When the "theme" is "dark"', () => {
      it('should render the "source-text" correctly', () => {
        const component = render(renderNewsListItem());
        const style = elements.sourceText(component).props.style[2];
        expect(style.color).toEqual(dark.colors.primary);
      });

      it('should render the "news-text" correctly', () => {
        const component = render(renderNewsListItem());
        const style = elements.newsText(component).props.style[2];
        expect(style.color).toEqual(dark.colors.text);
      });
    });

    describe('When the "theme" is "light"', () => {
      it('should render the "source-text" correctly', () => {
        const component = render(renderNewsListItem('', light));
        const style = elements.sourceText(component).props.style[2];
        expect(style.color).toEqual(light.colors.buttonText);
      });

      it('should render the "news-text" correctly', () => {
        const component = render(renderNewsListItem('', light));
        const style = elements.newsText(component).props.style[2];
        expect(style.color).toEqual(light.colors.subText);
      });
    });
  });

  it('should "not call" any "Linking" methods when "url" is "not defined"', async () => {
    const canOpenURLSpy = jest.spyOn(Linking, 'canOpenURL');
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    canOpenURLSpy.mockResolvedValue(false);
    const component = render(renderNewsListItem());
    fireEvent.press(elements.wrapperButton(component));
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(canOpenURLSpy).toHaveBeenCalledTimes(0);
      expect(openURLSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('should call "Linking.openURL" correctly  "Linking.canOpenURL" is " true"', async () => {
    const url = 'MY_URL.com';
    const canOpenURLSpy = jest.spyOn(Linking, 'canOpenURL');
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    canOpenURLSpy.mockResolvedValue(true);
    const component = render(renderNewsListItem(url));
    fireEvent.press(elements.wrapperButton(component));
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(canOpenURLSpy).toHaveBeenCalledTimes(1);
      expect(canOpenURLSpy).toHaveBeenCalledWith(url);
      expect(openURLSpy).toHaveBeenCalledTimes(1);
      expect(openURLSpy).toHaveBeenCalledWith(url);
    });
  });

  it('should not call "Linking.openURL" when "Linking.canOpenURL" returns "false"', async () => {
    const url = 'MY_URL.com';
    const canOpenURLSpy = jest.spyOn(Linking, 'canOpenURL');
    const openURLSpy = jest.spyOn(Linking, 'openURL');
    canOpenURLSpy.mockResolvedValue(false);
    const component = render(renderNewsListItem(url));
    fireEvent.press(elements.wrapperButton(component));
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(canOpenURLSpy).toHaveBeenCalledTimes(1);
      expect(canOpenURLSpy).toHaveBeenCalledWith(url);
      expect(openURLSpy).toHaveBeenCalledTimes(0);
    });
  });
});
