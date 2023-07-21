import React from 'react';
import {RenderAPI, render} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';
import packageJson from '@dependencies';

import {SupportLibraries} from './SupportLibraries';

const renderSupportLibraries = () => (
  <ThemeProvider theme={theme}>
    <SupportLibraries />
  </ThemeProvider>
);

describe('<SupportLibraries />', () => {
  const elements = {
    supportLibrariesTitle: (api: RenderAPI) =>
      api.queryByTestId('support-libraries-title'),
    supportLibrariesDescription: (api: RenderAPI) =>
      api.queryByTestId('support-libraries-description'),
  };

  describe('Rendering the texts', () => {
    it('should render the "Section-title" correctly', () => {
      const component = render(renderSupportLibraries());
      expect(elements.supportLibrariesTitle(component).children[0]).toEqual(
        Translations.Tags.SETTINGS_OPEN_SOURCE_LIBRARIES_TITLE,
      );
    });

    it('should render the "Section-description" correctly', () => {
      const component = render(renderSupportLibraries());
      expect(
        elements.supportLibrariesDescription(component).children[0],
      ).toEqual(Translations.Tags.SETTINGS_OPEN_SOURCE_LIBRARIES_DESCRIPTION);
    });
  });

  describe('Rendering the support-librarries', () => {
    it('should render the "support-libraries" correctly', () => {
      const supportLibraries = [
        ...Object.keys(packageJson.devDependencies),
        ...Object.keys(packageJson.dependencies),
      ];
      const component = render(renderSupportLibraries());
      supportLibraries.forEach(supportLibrary => {
        expect(
          component.queryByTestId(`support-library-${supportLibrary}`)
            .children[0],
        ).toEqual(supportLibrary);
      });
    });

    it('should render the "support-libraries" in the ascending order', () => {
      const supportLibraries = [
        ...Object.keys(packageJson.devDependencies),
        ...Object.keys(packageJson.dependencies),
      ].sort((a, b) => a.localeCompare(b));
      const component = render(renderSupportLibraries());
      for (let i = 1; i < supportLibraries.length; i++) {
        const previousLibrary = component.queryAllByTestId(/support-library-/)[
          i - 1
        ].children[0] as string;
        const currentLibrary = component.queryAllByTestId(/support-library-/)[i]
          .children[0] as string;
        expect(previousLibrary < currentLibrary).toEqual(true);
      }
    });
  });
});
