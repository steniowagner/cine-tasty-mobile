import React from 'react';
import { render, cleanup, act } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import { DEFAULT_ANIMATION_DURATION } from '@components/common/popup-advice/PopupAdvice';
import * as TRANSLATIONS from '@i18n/tags';
import theme from '@styles/theme';

import timeTravel, {
  setupTimeTravel,
} from '../../../../../../../../__mocks__/timeTravel';
import Overview from './Overview';
import { NUMBER_ITEMS } from './LoadingOverview';

const renderOverview = (isLoading = false, overview = 'overview') => (
  <ThemeProvider theme={theme}>
    <Overview isLoading={isLoading} overview={overview} />
  </ThemeProvider>
);

describe('Testing <Overview />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly when is not loading', () => {
    const { getByText, queryByTestId, queryAllByTestId, getByTestId } = render(
      renderOverview(),
    );

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_OVERVIEW)).not.toBeNull();

    expect(getByTestId('description-text')).not.toBeNull();

    expect(queryByTestId('loading-overview')).toBeNull();

    expect(queryAllByTestId('loading-placeholder').length).toEqual(0);
  });

  it('should render correctly when is loading', () => {
    const { getByText, queryByTestId, getAllByTestId, getByTestId } = render(
      renderOverview(true),
    );

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    expect(getByText(TRANSLATIONS.MEDIA_DETAIL_SECTIONS_OVERVIEW)).not.toBeNull();

    expect(queryByTestId('description-text')).toBeNull();

    expect(getByTestId('loading-overview')).not.toBeNull();

    expect(getAllByTestId('loading-placeholder').length).toEqual(NUMBER_ITEMS);
  });
});
