import React from 'react';
import {Linking} from 'react-native';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import NewsListItem from './NewsListItem';

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

  it('should call the "Linking.openURL" with the correct params when the user presses the list-item', () => {
    const url = 'MY_URL.com';
    const component = render(renderNewsListItem(url));
    fireEvent.press(elements.wrapperButton(component));
    expect(Linking.openURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith(url);
  });
});
