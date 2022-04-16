import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {MediaDetailsError} from './MediaDetailsError';

const renderMediaDetailsError = () => (
  <ThemeProvider theme={dark}>
    <MediaDetailsError />
  </ThemeProvider>
);

describe('<MediaDetailsError />', () => {
  const elements = {
    description: (api: RenderAPI) => api.queryByTestId('advise-description'),
    suggestion: (api: RenderAPI) => api.queryByTestId('advise-suggestion'),
    icon: (api: RenderAPI) => api.queryByTestId('icon-alert-box'),
    title: (api: RenderAPI) => api.queryByTestId('advise-title'),
  };

  describe('Renders correctly', () => {
    it('should render correctly', () => {
      const component = render(renderMediaDetailsError());
      expect(elements.description(component)).not.toBeNull();
      expect(elements.description(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_ERROR_DESCRIPTION,
      );
      expect(elements.suggestion(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_ERROR_SUGGESTION,
      );
      expect(elements.suggestion(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_ERROR_TITLE,
      );
      expect(elements.title(component)).not.toBeNull();
      expect(elements.icon(component)).not.toBeNull();
    });
  });
});
