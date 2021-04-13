import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import PaginationFooter from './PaginationFooter';

type CallableFunction = () => void;

const defaultProps = {
  onPressReloadButton: jest.fn,
  isPaginating: false,
  hasError: false,
};

type Props = {
  onPressReloadButton: CallableFunction;
  isPaginating: boolean;
  hasError: boolean;
};

const renderPaginationFooter = ({
  onPressReloadButton,
  isPaginating,
  hasError,
}: Props = defaultProps) => (
  <ThemeProvider theme={theme}>
    <PaginationFooter
      onPressReloadButton={onPressReloadButton}
      isPaginating={isPaginating}
      hasError={hasError}
    />
  </ThemeProvider>
);

describe('Testing <PaginationFooter />', () => {
  it('should render correctly', () => {
    const { queryByTestId } = render(renderPaginationFooter());

    expect(queryByTestId('pagination-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });

  it('should render correctly when "hasError" is "true"', () => {
    const { queryByTestId } = render(
      renderPaginationFooter({
        ...defaultProps,
        hasError: true,
      }),
    );

    expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();
  });

  it('should render correctly when "isPaginating" is "true"', () => {
    const { queryByTestId } = render(
      renderPaginationFooter({
        ...defaultProps,
        isPaginating: true,
      }),
    );

    expect(queryByTestId('loading-footer-wrapper')).not.toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).toBeNull();
  });

  it('should call the "onPressReloadButton" when the load-button is pressed', () => {
    const onPressReloadButton = jest.fn();

    const { getByTestId, queryByTestId } = render(
      renderPaginationFooter({
        ...defaultProps,
        onPressReloadButton,
        hasError: true,
      }),
    );

    expect(queryByTestId('loading-footer-wrapper')).toBeNull();

    expect(queryByTestId('pagination-footer-reload-button')).not.toBeNull();

    fireEvent.press(getByTestId('pagination-footer-reload-button'));

    expect(onPressReloadButton).toHaveBeenCalledTimes(1);
  });
});
