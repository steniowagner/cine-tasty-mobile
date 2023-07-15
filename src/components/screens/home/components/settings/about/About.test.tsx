import React from 'react';
import {Linking} from 'react-native';
import {
  RenderAPI,
  fireEvent,
  render,
  within,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';
import {CONSTANTS} from '@utils';

import {socialNetworks} from './socialNetworks';
import {About} from './About';

jest.spyOn(Linking, 'openURL');

const renderAbout = () => (
  <ThemeProvider theme={dark}>
    <About />
  </ThemeProvider>
);

describe('<About />', () => {
  const elements = {
    nameText: (api: RenderAPI) => api.queryByTestId('name-text'),
    softwareEngienerText: (api: RenderAPI) =>
      api.queryByTestId('software-engineer-text'),
    aboutMeText: (api: RenderAPI) => api.queryByTestId('about-me-text'),
    socialNetworkButtons: (api: RenderAPI) =>
      api.queryAllByTestId('social-network-button'),
    socialNetworkIcons: (api: RenderAPI) => api.queryAllByTestId(/icon-/),
  };

  describe('Testing the elements', () => {
    it('should use the correct url for the "Profile-image"', () => {
      const component = render(renderAbout());
      expect(component.getByTestId('profile-image').props.source.uri).toEqual(
        CONSTANTS.VALUES.IMAGES.PROFILE,
      );
    });

    it('should show the text-content correctly', () => {
      const component = render(renderAbout());
      expect(elements.nameText(component).children[0]).toEqual('Stenio Wagner');
      expect(elements.aboutMeText(component).children[0]).toEqual(
        Translations.Tags.SETTINGS_ABOUT_ABOUT_ME,
      );
      expect(elements.softwareEngienerText(component).children[0]).toEqual(
        Translations.Tags.SETTINGS_ABOUT_SOFTWARE_ENGINEER,
      );
    });

    it('should show the "Social-network buttons" correctly', () => {
      const component = render(renderAbout());
      const socialNetworkButtons = elements.socialNetworkButtons(component);
      socialNetworkButtons.forEach((socialNetworkButton, index) => {
        const icon = within(socialNetworkButton).queryByTestId(/icon/);
        const color = socialNetworkButton.props.style.backgroundColor;
        expect(color).toEqual(socialNetworks[index].color);
        expect(icon.props.testID).toEqual(`icon-${socialNetworks[index].icon}`);
      });
    });
  });

  describe('Pressing the social-network buttons', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call "Linking.openURL" correctly when the user presses the "LinkedIn" button', () => {
      const component = render(renderAbout());
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.socialNetworkButtons(component)[0]);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(socialNetworks[0].url);
    });

    it('should call "Linking.openURL" correctly when the user presses the "GitHub" button', () => {
      const component = render(renderAbout());
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.socialNetworkButtons(component)[1]);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(socialNetworks[1].url);
    });

    it('should call "Linking.openURL" correctly when the user presses the "Instagram" button', () => {
      const component = render(renderAbout());
      expect(Linking.openURL).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.socialNetworkButtons(component)[2]);
      expect(Linking.openURL).toHaveBeenCalledTimes(1);
      expect(Linking.openURL).toHaveBeenCalledWith(socialNetworks[2].url);
    });
  });
});
