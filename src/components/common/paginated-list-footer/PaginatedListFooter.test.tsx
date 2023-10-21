import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';

import { PaginatedListFooter } from './PaginatedListFooter';

type RenderPaginatedListFooterProps = {
  onPressReloadButton?: () => void;
  isPaginating?: boolean;
  hasError?: boolean;
};

const renderPaginatedListFooter = (
  props: RenderPaginatedListFooterProps = {},
) => (
  <ThemeProvider theme={theme}>
    <PaginatedListFooter
      onPressReloadButton={props.onPressReloadButton || jest.fn()}
      isPaginating={props.isPaginating || false}
      hasError={props.hasError || false}
    />
  </ThemeProvider>
);

describe('Common-components/PaginatedListFooter', () => {
  const elements = {
    paginatedListFooterWrapper: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    loadingFooterWrapper: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginatedListFooterReloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
  };

  it('should render correctly when "isPaginating" and "hasError" are "false"', () => {
    const component = render(renderPaginatedListFooter());
    expect(elements.paginatedListFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).toBeNull();
    expect(elements.paginatedListFooterReloadButton(component)).toBeNull();
  });

  it('should render correctly when "hasError" is "true"', () => {
    const component = render(
      renderPaginatedListFooter({
        hasError: true,
      }),
    );
    expect(elements.paginatedListFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).toBeNull();
    expect(elements.paginatedListFooterReloadButton(component)).not.toBeNull();
  });

  it('should render correctly when "isPaginating" is "true"', () => {
    const component = render(
      renderPaginatedListFooter({
        isPaginating: true,
      }),
    );
    expect(elements.paginatedListFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).not.toBeNull();
    expect(elements.paginatedListFooterReloadButton(component)).toBeNull();
  });

  it('should call the "onPressReloadButton" correctly when the "load-button" is "pressed"', () => {
    const onPressReloadButton = jest.fn();
    const component = render(
      renderPaginatedListFooter({
        onPressReloadButton,
        hasError: true,
      }),
    );
    expect(elements.paginatedListFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).toBeNull();
    expect(elements.paginatedListFooterReloadButton(component)).not.toBeNull();
    expect(onPressReloadButton).toHaveBeenCalledTimes(0);
    fireEvent.press(elements.paginatedListFooterReloadButton(component)!);
    expect(onPressReloadButton).toHaveBeenCalledTimes(1);
  });
});
