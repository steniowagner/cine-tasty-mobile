import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';

import { PaginatedListHeader } from './PaginatedListHeader';

const renderPaginationFooter = (onPress = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <PaginatedListHeader onPress={onPress} />
  </ThemeProvider>
);

describe('<PaginatedListHeader />', () => {
  const elements = {
    reloadButton: (api: RenderAPI) => api.getByTestId('top-reload-button'),
    icon: (api: RenderAPI) => api.getByTestId('icon-restart'),
  };

  it('should render correctly', () => {
    const component = render(renderPaginationFooter());
    expect(elements.reloadButton(component)).not.toBeNull();
    expect(elements.icon(component)).not.toBeNull();
  });

  it('should call the "onPress" when the user presses the "top-reload-button"', () => {
    const onPress = jest.fn();
    const component = render(renderPaginationFooter(onPress));
    expect(onPress).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.reloadButton(component));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
