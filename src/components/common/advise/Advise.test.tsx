import React from 'react';
import {RenderAPI, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import Advise from './Advise';

const DEFAULT_DESCRIPTION = 'description';
const DEFAULT_SUGGESTION = 'suggestion';
const DEFAULT_TITLE = 'title';

const renderAdvise = (
  title?: string,
  description?: string,
  suggestion?: string,
) => (
  <ThemeProvider theme={theme}>
    <Advise
      description={description}
      suggestion={suggestion}
      title={title}
      icon="account"
    />
  </ThemeProvider>
);

describe('<Advise />', () => {
  const elements = {
    adviseWrapper: (api: RenderAPI) => api.queryByTestId('advise-wrapper'),
    iconWrapper: (api: RenderAPI) => api.queryByTestId('icon-wrapper'),
    adviseTitle: (api: RenderAPI) => api.queryByTestId('advise-title'),
    adviseDescription: (api: RenderAPI) =>
      api.queryByTestId('advise-description'),
    adviseSuggestion: (api: RenderAPI) =>
      api.queryByTestId('advise-suggestion'),
  };

  it('should render correctly when all parameters are non-empty strings', () => {
    const component = render(
      renderAdvise(DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_SUGGESTION),
    );
    expect(elements.adviseWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviseDescription(component).children[0]).toEqual(
      DEFAULT_DESCRIPTION,
    );
    expect(elements.adviseSuggestion(component).children[0]).toEqual(
      DEFAULT_SUGGESTION,
    );
    expect(elements.adviseTitle(component).children[0]).toEqual(DEFAULT_TITLE);
  });

  it('should render correctly when the "title" is not present', () => {
    const component = render(
      renderAdvise(undefined, DEFAULT_DESCRIPTION, DEFAULT_SUGGESTION),
    );
    expect(elements.adviseWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviseDescription(component).children[0]).toEqual(
      DEFAULT_DESCRIPTION,
    );
    expect(elements.adviseSuggestion(component).children[0]).toEqual(
      DEFAULT_SUGGESTION,
    );
    expect(elements.adviseTitle(component)).toBeNull();
  });

  it('should render correctly when the "description" is not present', () => {
    const component = render(
      renderAdvise(DEFAULT_TITLE, undefined, DEFAULT_SUGGESTION),
    );
    expect(elements.adviseWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviseTitle(component).children[0]).toEqual(DEFAULT_TITLE);
    expect(elements.adviseSuggestion(component).children[0]).toEqual(
      DEFAULT_SUGGESTION,
    );
    expect(elements.adviseDescription(component)).toBeNull();
  });

  it('should render correctly when the "title" and "suggestion" are not present', () => {
    const component = render(
      renderAdvise(undefined, DEFAULT_DESCRIPTION, undefined),
    );
    expect(elements.adviseWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviseTitle(component)).toBeNull();
    expect(elements.adviseSuggestion(component)).toBeNull();
    expect(elements.adviseDescription(component).children[0]).toEqual(
      DEFAULT_DESCRIPTION,
    );
  });

  it('should render correctly when the "suggestion" is not present', () => {
    const component = render(
      renderAdvise(DEFAULT_TITLE, DEFAULT_DESCRIPTION, undefined),
    );
    expect(elements.adviseWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviseTitle(component).children[0]).toEqual(DEFAULT_TITLE);
    expect(elements.adviseDescription(component).children[0]).toEqual(
      DEFAULT_DESCRIPTION,
    );
    expect(elements.adviseSuggestion(component)).toBeNull();
  });

  it('should render correctly when none of the option texts is present', () => {
    const component = render(renderAdvise());
    expect(elements.adviseWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviseTitle(component)).toBeNull();
    expect(elements.adviseDescription(component)).toBeNull();
    expect(elements.adviseSuggestion(component)).toBeNull();
  });
});
