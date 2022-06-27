import React from 'react';
import {RenderAPI, render, fireEvent} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {SectionViewAll} from './SectionViewAll';

const SECTION_TITLE = 'SECTION_TITLE';
const ID = 'ID';

const renderViewAll = (withViewAll?: boolean, onPressViewAll = jest.fn()) => (
  <ThemeProvider theme={theme}>
    <SectionViewAll
      onPressViewAll={onPressViewAll}
      sectionTitle={SECTION_TITLE}
      withViewAll={withViewAll}
      id={ID}
    />
  </ThemeProvider>
);

describe('<SectionViewAll />', () => {
  const elements = {
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    viewAllButton: (api: RenderAPI) =>
      api.queryByTestId(`view-all-button-${ID}`),
    viewAllText: (api: RenderAPI) => api.queryByTestId('view-all-text'),
    icon: (api: RenderAPI) => api.queryByTestId('icon-chevron-right'),
  };

  describe('Renders correclty', () => {
    it('should render correctly when "withViewAll" is "true"', () => {
      const component = render(renderViewAll(true));
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        SECTION_TITLE,
      );
      expect(elements.viewAllButton(component)).not.toBeNull();
      expect(elements.viewAllText(component)).not.toBeNull();
      expect(elements.icon(component)).not.toBeNull();
    });

    it('should render correctly when "withViewAll" is "false"', () => {
      const component = render(renderViewAll(false));
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        SECTION_TITLE,
      );
      expect(elements.viewAllButton(component)).toBeNull();
      expect(elements.viewAllText(component)).toBeNull();
      expect(elements.icon(component)).toBeNull();
    });

    it('should render correctly when "withViewAll" is "undefined"', () => {
      const component = render(renderViewAll());
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        SECTION_TITLE,
      );
      expect(elements.viewAllButton(component)).not.toBeNull();
      expect(elements.viewAllText(component)).not.toBeNull();
      expect(elements.viewAllText(component).children[0]).toEqual(
        Translations.Tags.HOME_VIEW_ALL,
      );
      expect(elements.icon(component)).not.toBeNull();
    });
  });

  describe('Presses correclty', () => {
    it('should call the "onPressViewAll" when "withViewAll" is "true"', () => {
      const onPressViewAll = jest.fn();
      const component = render(renderViewAll(true, onPressViewAll));
      expect(onPressViewAll).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.viewAllButton(component));
      expect(onPressViewAll).toHaveBeenCalledTimes(1);
    });

    it('should not call the "onPressViewAll" when "withViewAll" is "undefiend"', () => {
      const onPressViewAll = jest.fn();
      const component = render(renderViewAll(undefined, onPressViewAll));
      expect(onPressViewAll).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.viewAllButton(component));
      expect(onPressViewAll).toHaveBeenCalledTimes(1);
    });
  });
});
