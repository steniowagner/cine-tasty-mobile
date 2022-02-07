import React from 'react';
import {RenderAPI, fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import PaginationFooter from './PaginationFooter';

type RenderPaginationFooterProps = {
  onPressReloadButton?: () => void;
  isPaginating?: boolean;
  hasError?: boolean;
};

const renderPaginationFooter = (props: RenderPaginationFooterProps = {}) => (
  <ThemeProvider theme={theme}>
    <PaginationFooter
      onPressReloadButton={props.onPressReloadButton || jest.fn()}
      isPaginating={props.isPaginating || false}
      hasError={props.hasError || false}
    />
  </ThemeProvider>
);

describe('<PaginationFooter />', () => {
  const elements = {
    paginationFooterWrapper: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-wrapper'),
    loadingFooterWrapper: (api: RenderAPI) =>
      api.queryByTestId('pagination-loading-footer-wrapper'),
    paginationFooterReloadButton: (api: RenderAPI) =>
      api.queryByTestId('pagination-footer-reload-button'),
  };

  it('should only render the wrapper when "isPaginating" and "hasError" are "false"', () => {
    const component = render(renderPaginationFooter());
    expect(elements.paginationFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).toBeNull();
    expect(elements.paginationFooterReloadButton(component)).toBeNull();
  });

  it('should render correctly when "hasError" is "true"', () => {
    const component = render(
      renderPaginationFooter({
        hasError: true,
      }),
    );
    expect(elements.paginationFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).toBeNull();
    expect(elements.paginationFooterReloadButton(component)).not.toBeNull();
  });

  it('should render correctly when "isPaginating" is "true"', () => {
    const component = render(
      renderPaginationFooter({
        isPaginating: true,
      }),
    );
    expect(elements.paginationFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).not.toBeNull();
    expect(elements.paginationFooterReloadButton(component)).toBeNull();
  });

  it('should call the "onPressReloadButton" when the load-button is pressed', () => {
    const onPressReloadButton = jest.fn();
    const component = render(
      renderPaginationFooter({
        onPressReloadButton,
        hasError: true,
      }),
    );
    expect(elements.paginationFooterWrapper(component)).not.toBeNull();
    expect(elements.loadingFooterWrapper(component)).toBeNull();
    expect(elements.paginationFooterReloadButton(component)).not.toBeNull();
    expect(onPressReloadButton).toHaveBeenCalledTimes(0);

    fireEvent.press(elements.paginationFooterReloadButton(component));

    expect(onPressReloadButton).toHaveBeenCalledTimes(1);
  });
});
