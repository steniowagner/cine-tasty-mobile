import React from 'react';
import { render, cleanup, act } from '@testing-library/react-native';

import { DEFAULT_ANIMATION_DURATION } from '@components/common/popup-advice/PopupAdvice';
import { ThemeContextProvider } from '@providers';

import { NUMBER_ITEMS } from './loading-expansible-text-section/LoadingExpansibleTextSection';
import timeTravel, { setupTimeTravel } from '../../../../__mocks__/timeTravel';
import ExpansibleTextSection from './ExpansibleTextSection';

const SECTION_TITLE = 'SECTION_TITLE';

const renderExpansibleTextSection = ({
  sectionTitle = SECTION_TITLE,
  isLoading = false,
  text = 'text',
}) => (
  <ThemeContextProvider>
    <ExpansibleTextSection
      sectionTitle={sectionTitle}
      isLoading={isLoading}
      text={text}
    />
  </ThemeContextProvider>
);

describe('Testing <ExpansibleTextSection />', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly when is not loading', () => {
    const { getByText, queryByTestId, queryAllByTestId, getByTestId } = render(
      renderExpansibleTextSection({}),
    );

    expect(getByText(SECTION_TITLE)).not.toBeNull();

    expect(getByTestId('description-text')).not.toBeNull();

    expect(queryByTestId('loading-expansible-text-section')).toBeNull();

    expect(queryAllByTestId('loading-placeholder').length).toEqual(0);
  });

  it('should render correctly when is loading', () => {
    const { getByText, queryByTestId, getAllByTestId, getByTestId } = render(
      renderExpansibleTextSection({ isLoading: true }),
    );

    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });

    expect(getByText(SECTION_TITLE)).not.toBeNull();

    expect(queryByTestId('description-text')).toBeNull();

    expect(getByTestId('loading-expansible-text-section')).not.toBeNull();

    expect(getAllByTestId('loading-placeholder').length).toEqual(NUMBER_ITEMS);
  });
});
