import React from 'react';
import {Image} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {dark} from '@styles/themes/dark';

import {PeopleListItem} from './PeopleListItem';

const SUBTEXT = 'SOME_SUBTEXT';
const NAME = 'SOME_NAME';
const TYPE = 'SOME_TYPE';

const renderPeopleListItem = (onPress = jest.fn(), withSubtext?: boolean) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={dark}>
      <PeopleListItem
        onPress={onPress}
        withSubtext={withSubtext}
        subText={SUBTEXT}
        image="SOME_IMAGE"
        name={NAME}
        type={TYPE}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<PeopleListItem />', () => {
  const elements = {
    button: (api: RenderAPI) => api.queryByTestId(`button-wrapper-${TYPE}`),
    image: (api: RenderAPI) => api.queryByTestId('person-image'),
    name: (api: RenderAPI) => api.queryByTestId('person-name'),
    subtext: (api: RenderAPI) => api.queryByTestId('person-subtext'),
  };

  beforeAll(() => {
    jest
      .spyOn(Image, 'getSize')
      .mockImplementation(
        (_: string, onSuccess: (width: number, height: number) => void) => {
          onSuccess(100, 100);
        },
      );
  });

  describe('Renders correctly', () => {
    it('should render correctly when the "withSubtext" is "true"', async () => {
      const component = render(renderPeopleListItem(jest.fn(), true));
      expect(elements.button(component)).not.toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.subtext(component)).not.toBeNull();
      expect(elements.subtext(component).children[0]).toEqual(SUBTEXT);
      await waitFor(() => {});
    });

    it('should render correctly when the "withSubtext" is "false"', async () => {
      const component = render(renderPeopleListItem(jest.fn(), false));
      expect(elements.button(component)).not.toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.subtext(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Pressing the item', () => {
    it('should call the "onPress" when the user press the item', async () => {
      const onPress = jest.fn();
      const component = render(renderPeopleListItem(onPress, true));
      expect(onPress).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.button(component));
      expect(onPress).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
