import React from 'react';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {QuestionsError} from './QuestionsError';

const renderQuestionsError = () => (
  <ThemeProvider theme={theme}>
    <QuestionsError />
  </ThemeProvider>
);

describe('<QuestionsError />', () => {
  const elements = {
    descriptionText: (api: RenderAPI) =>
      api.queryByTestId('advise-description'),
    suggestionText: (api: RenderAPI) => api.queryByTestId('advise-suggestion'),
    titleText: (api: RenderAPI) => api.queryByTestId('advise-title'),
    wrapper: (api: RenderAPI) => api.queryByTestId('network-error-wrapper'),
    alertBoxIcon: (api: RenderAPI) => api.queryByTestId('icon-alert-box'),
  };

  afterEach(cleanup);

  it('should renders correctly', () => {
    const component = render(renderQuestionsError());
    expect(elements.wrapper(component)).not.toBeNull();
    expect(elements.alertBoxIcon(component)).not.toBeNull();
    expect(elements.descriptionText(component)).not.toBeNull();
    expect(elements.descriptionText(component).children[0]).toEqual(
      Translations.Tags.ERRORS_NETWORK_ERROR_DESCRIPTION,
    );
    expect(elements.suggestionText(component)).not.toBeNull();
    expect(elements.suggestionText(component).children[0]).toEqual(
      Translations.Tags.ERRORS_NETWORK_ERROR_SUGGESTION,
    );
    expect(elements.titleText(component)).not.toBeNull();
    expect(elements.titleText(component).children[0]).toEqual(
      Translations.Tags.ERRORS_NETWORK_ERROR_TITLE,
    );
  });
});
