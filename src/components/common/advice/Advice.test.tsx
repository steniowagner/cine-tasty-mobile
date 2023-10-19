import React from 'react';
import { RenderAPI, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { dark as theme } from '@styles/themes/dark';

import { Advice } from './Advice';

const DEFAULT_DESCRIPTION = 'description';
const DEFAULT_SUGGESTION = 'suggestion';
const DEFAULT_TITLE = 'title';

const renderAdvice = () => (
  <ThemeProvider theme={theme}>
    <Advice
      description={DEFAULT_DESCRIPTION}
      suggestion={DEFAULT_SUGGESTION}
      title={DEFAULT_TITLE}
      icon="account"
    />
  </ThemeProvider>
);

describe('Common/Advice', () => {
  const elements = {
    adviceWrapper: (api: RenderAPI) => api.getByTestId('advice-wrapper'),
    iconWrapper: (api: RenderAPI) => api.getByTestId('icon-wrapper'),
    adviceTitle: (api: RenderAPI) => api.getByTestId('advice-title'),
    adviceDescription: (api: RenderAPI) =>
      api.getByTestId('advice-description'),
    adviceSuggestion: (api: RenderAPI) => api.getByTestId('advice-suggestion'),
  };

  it('should render correctly', () => {
    const component = render(renderAdvice());
    expect(elements.adviceWrapper(component)).not.toBeNull();
    expect(elements.iconWrapper(component)).not.toBeNull();
    expect(elements.adviceDescription(component).children[0]).toEqual(
      DEFAULT_DESCRIPTION,
    );
    expect(elements.adviceSuggestion(component).children[0]).toEqual(
      DEFAULT_SUGGESTION,
    );
    expect(elements.adviceTitle(component).children[0]).toEqual(DEFAULT_TITLE);
  });
});
