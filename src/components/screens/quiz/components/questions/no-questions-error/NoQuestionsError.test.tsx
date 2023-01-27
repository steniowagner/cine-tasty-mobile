import React from 'react';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {NoQuestionsError} from './NoQuestionsError';

const renderNoQuestionsError = () => (
  <ThemeProvider theme={theme}>
    <NoQuestionsError />
  </ThemeProvider>
);

describe('<NoQuestionsError />', () => {
  const elements = {
    descriptionText: (api: RenderAPI) =>
      api.queryByTestId('advise-description'),
    suggestionText: (api: RenderAPI) => api.queryByTestId('advise-suggestion'),
    titleText: (api: RenderAPI) => api.queryByTestId('advise-title'),
    wrapper: (api: RenderAPI) =>
      api.queryByTestId('no-questions-error-wrapper'),
    playlistIcon: (api: RenderAPI) => api.queryByTestId('icon-playlist-remove'),
  };

  afterEach(cleanup);

  it('should renders correctly', () => {
    const component = render(renderNoQuestionsError());
    expect(elements.wrapper(component)).not.toBeNull();
    expect(elements.playlistIcon(component)).not.toBeNull();
    expect(elements.descriptionText(component)).not.toBeNull();
    expect(elements.descriptionText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_NO_QUESTIONS_ADVISE_DESCRIPTION,
    );
    expect(elements.suggestionText(component)).not.toBeNull();
    expect(elements.suggestionText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_NO_QUESTIONS_ADVISE_SUGGESTION,
    );
    expect(elements.titleText(component)).not.toBeNull();
    expect(elements.titleText(component).children[0]).toEqual(
      Translations.Tags.QUIZ_NO_QUESTIONS_ADVISE_TITLE,
    );
  });
});
