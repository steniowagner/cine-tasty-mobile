import React from 'react';
import {
  render,
  cleanup,
  act,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

import {DEFAULT_ANIMATION_DURATION, ThemeContextProvider} from '@providers';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';

import {NUMBER_ITEMS} from './loading-expansible-text-section/LoadingExpansibleTextSection';
import {ExpansibleTextSection} from './ExpansibleTextSection';

const SECTION_TITLE = 'SECTION_TITLE';
const TEXT = 'TEXT';

const renderExpansibleTextSection = ({
  sectionTitle = SECTION_TITLE,
  isLoading = false,
  text = TEXT,
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
    loadingPlaceholder: (api: RenderAPI) =>
      api.queryAllByTestId('loading-placeholder'),
  };

  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly when is loading', async () => {
    const component = render(renderExpansibleTextSection({isLoading: true}));
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(SECTION_TITLE);
    expect(elements.description(component)).toBeNull();
    expect(elements.mediaItemDescriptionWrapper(component)).toBeNull();
    expect(elements.loadingTextSection(component)).not.toBeNull();
    expect(elements.loadingPlaceholder(component).length).toEqual(NUMBER_ITEMS);
    await waitFor(() => {});
  });

  it('should render correctly when is not loading', async () => {
    const component = render(renderExpansibleTextSection({}));
    act(() => {
      timeTravel(DEFAULT_ANIMATION_DURATION);
    });
    expect(elements.sectionTitle(component)).not.toBeNull();
    expect(elements.sectionTitle(component).children[0]).toEqual(SECTION_TITLE);
    expect(elements.description(component)).not.toBeNull();
    expect(elements.description(component).children[0]).toEqual(TEXT);
    expect(elements.mediaItemDescriptionWrapper(component)).not.toBeNull();
    expect(elements.loadingTextSection(component)).toBeNull();
    expect(elements.loadingPlaceholder(component).length).toEqual(0);
    await waitFor(() => {});
  });
});
