import React from 'react';
import {render, cleanup, act, RenderAPI} from '@testing-library/react-native';

import {DEFAULT_ANIMATION_DURATION, ThemeContextProvider} from '@providers';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';

import {NUMBER_ITEMS} from './loading-expansible-text-section/LoadingExpansibleTextSection';
import {ExpansibleTextSection} from './ExpansibleTextSection';

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

describe('<ExpansibleTextSection />', () => {
  const elements = {
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    loadingTextSection: (api: RenderAPI) =>
      api.queryByTestId('loading-expansible-text-section'),
    mediaItemDescriptionWrapper: (api: RenderAPI) =>
      api.queryByTestId('media-item-description-wrapper'),
    description: (api: RenderAPI) => api.queryByTestId('description-text'),
    expandableReadButton: (api: RenderAPI) =>
      api.queryByTestId('expandable-read-button'),
    expandableReadText: (api: RenderAPI) =>
      api.queryByTestId('expandable-read-text'),
  };

  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly when is not loading', () => {
    const {getByText, queryByTestId, queryAllByTestId, getByTestId} = render(
      renderExpansibleTextSection({}),
    );

    expect(getByText(SECTION_TITLE)).not.toBeNull();

    expect(getByTestId('description-text')).not.toBeNull();

    expect(queryByTestId('loading-expansible-text-section')).toBeNull();

    expect(queryAllByTestId('loading-placeholder').length).toEqual(0);
  });

  it('should render correctly when is loading', () => {
    const {getByText, queryByTestId, getAllByTestId, getByTestId} = render(
      renderExpansibleTextSection({isLoading: true}),
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
