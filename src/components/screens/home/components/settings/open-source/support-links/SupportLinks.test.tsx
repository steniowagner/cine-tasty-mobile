import React from 'react';
import {Linking} from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  within,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';

import {supportLinksItems} from './support-links-items';
import {SupportLinks} from './SupportLinks';

jest.spyOn(Linking, 'openURL');

const renderSupportLinks = () => (
  <ThemeProvider theme={theme}>
    <SupportLinks />
  </ThemeProvider>
);

describe('<SupportLinks />', () => {
  const elements = {
    sections: (api: RenderAPI) => api.queryAllByTestId('support-links'),
  };

  describe('GitHub section', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const sectionIndex = 0;
    const supportLinkItem = supportLinksItems[sectionIndex];
    it('should show the texts correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId('support-link-title').children[0],
      ).toEqual(supportLinkItem.title);
      expect(
        within(section).getByTestId('support-link-description').children[0],
      ).toEqual(supportLinkItem.description);
    });

    it('should show the icon-button correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId(`icon-${supportLinkItem.icon}`),
      ).not.toBeNull();
      expect(
        within(section).getByTestId('suppot-link-button-title').children[0],
      ).toEqual(supportLinksItems[sectionIndex].buttonText);
    });

    it('should call "Linking.openURL" correctly when the user presses the CTA-button', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      const button = within(section).getByTestId('suppot-link-button');
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(button);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(supportLinkItem.url);
    });
  });

  describe('OpenTriviaDB section', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const sectionIndex = 1;
    const supportLinkItem = supportLinksItems[sectionIndex];
    it('should show the texts correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId('support-link-title').children[0],
      ).toEqual(supportLinkItem.title);
      expect(
        within(section).getByTestId('support-link-description').children[0],
      ).toEqual(supportLinkItem.description);
    });

    it('should show the icon-button correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId(`icon-${supportLinkItem.icon}`),
      ).not.toBeNull();
      expect(
        within(section).getByTestId('suppot-link-button-title').children[0],
      ).toEqual(supportLinksItems[sectionIndex].buttonText);
    });

    it('should call "Linking.openURL" correctly when the user presses the CTA-button', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      const button = within(section).getByTestId('suppot-link-button');
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(button);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(supportLinkItem.url);
    });
  });

  describe('News API section', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const sectionIndex = 2;
    const supportLinkItem = supportLinksItems[sectionIndex];
    it('should show the texts correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId('support-link-title').children[0],
      ).toEqual(supportLinkItem.title);
      expect(
        within(section).getByTestId('support-link-description').children[0],
      ).toEqual(supportLinkItem.description);
    });

    it('should show the icon-button correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId(`icon-${supportLinkItem.icon}`),
      ).not.toBeNull();
      expect(
        within(section).getByTestId('suppot-link-button-title').children[0],
      ).toEqual(supportLinksItems[sectionIndex].buttonText);
    });

    it('should call "Linking.openURL" correctly when the user presses the CTA-button', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      const button = within(section).getByTestId('suppot-link-button');
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(button);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(supportLinkItem.url);
    });
  });

  describe('TheMovieDB API section', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    const sectionIndex = 3;
    const supportLinkItem = supportLinksItems[sectionIndex];
    it('should show the texts correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId('support-link-title').children[0],
      ).toEqual(supportLinkItem.title);
      expect(
        within(section).getByTestId('support-link-description').children[0],
      ).toEqual(supportLinkItem.description);
    });

    it('should show the icon-button correctly', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      expect(
        within(section).getByTestId(`icon-${supportLinkItem.icon}`),
      ).not.toBeNull();
      expect(
        within(section).getByTestId('suppot-link-button-title').children[0],
      ).toEqual(supportLinksItems[sectionIndex].buttonText);
    });

    it('should call "Linking.openURL" correctly when the user presses the CTA-button', () => {
      const component = render(renderSupportLinks());
      const section = elements.sections(component)[sectionIndex];
      const button = within(section).getByTestId('suppot-link-button');
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(button);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(supportLinkItem.url);
    });
  });
});
