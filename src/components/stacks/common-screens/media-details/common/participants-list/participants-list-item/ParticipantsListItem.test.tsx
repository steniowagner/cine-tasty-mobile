jest.unmock('react-native-reanimated');
import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { TMDBImageQualitiesProvider } from '@providers';
import { dark } from '@styles/themes/dark';

import { ParticipantListItem } from './ParticipantsListItem';

const SUBTEXT = 'SOME_SUBTEXT';
const NAME = 'SOME_NAME';

const renderParticipantListItem = (onPress = jest.fn(), subText?: string) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={dark}>
      <ParticipantListItem
        onPress={onPress}
        subText={subText}
        image="SOME_IMAGE"
        name={NAME}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('Common-screens/Media-Details/Common/ParticipantListItem', () => {
  const elements = {
    button: (api: RenderAPI) => api.getByTestId('participant-button'),
    image: (api: RenderAPI) => api.queryByTestId('participant-image'),
    name: (api: RenderAPI) => api.getByTestId('participant-name'),
    subtext: (api: RenderAPI) => api.queryByTestId('participant-subtext'),
  };

  describe('Renders correctly', () => {
    it('should render correctly', async () => {
      const component = render(renderParticipantListItem(jest.fn(), SUBTEXT));
      await waitFor(() => {
        expect(elements.image(component)).not.toBeNull();
      });
      expect(elements.button(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.subtext(component)).not.toBeNull();
      expect(elements.subtext(component)!.children[0]).toEqual(SUBTEXT);
      await waitFor(() => {});
    });

    it('should render correctly when the "subText" is "undefined"', async () => {
      const component = render(renderParticipantListItem(jest.fn()));
      await waitFor(() => {
        expect(elements.image(component)).not.toBeNull();
      });
      expect(elements.button(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.subtext(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Pressing', () => {
    it('should call the "onPress" when the user press the item', async () => {
      const onPress = jest.fn();
      const component = render(renderParticipantListItem(onPress));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
