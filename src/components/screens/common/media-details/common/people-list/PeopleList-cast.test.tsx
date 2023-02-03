import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {randomPositiveNumber, randomArrayElement} from '@mocks/utils';
import {ThemeProvider} from 'styled-components/native';
import {dark} from '@styles/themes/dark';
import * as Types from '@local-types';

import {LIST_BATCH_ITEMS_COUNT, PeopleList} from './PeopleList';

const SECTION_TITLE = 'CAST';

const cast = (length: number, withCharacter = true) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      character: withCharacter ? `CHARACTER_${index}` : undefined,
      __typename: 'CastItem',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as Types.CastDataset;

const renderPeopleList = (
  dataset: Types.CastDataset,
  onPressItem = jest.fn(),
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={dark}>
      <PeopleList
        sectionTitle={SECTION_TITLE}
        onPressItem={onPressItem}
        dataset={dataset}
        type="cast"
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<PeopleList /> - [Cast]', () => {
  const elements = {
    listItems: (api: RenderAPI) => api.queryAllByTestId('button-wrapper-cast'),
    list: (api: RenderAPI) => api.queryByTestId('people-list-cast'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    itemsSubtitles: (api: RenderAPI) => api.queryAllByTestId('person-subtext'),
  };

  describe('When it has up until $LIST_BATCH_ITEMS_COUNT items to show', () => {
    describe('Renders correctly', () => {
      it('should render correctly when has some data to be shown', async () => {
        const castLenght = randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1);
        const component = render(renderPeopleList(cast(castLenght)));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(castLenght);
        expect(elements.sectionTitle(component)).not.toBeNull();
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        await waitFor(() => {});
      });

      it('should parse the "cast" items to the "people-list-item" correctly when "character" is undefined"', async () => {
        const castItems = cast(
          randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1),
          false,
        );
        const component = render(renderPeopleList(castItems));
        const selectedItem = randomArrayElement(
          elements.itemsSubtitles(component),
        );
        expect(selectedItem.children[0]).toEqual('-');
        await waitFor(() => {});
      });

      it('should parse the "cast" items to the "people-list-item" correctly when "character" is defined"', async () => {
        const castLength = randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1);
        const castItems = cast(castLength);
        const component = render(renderPeopleList(castItems));
        const selectedItemIndex = randomPositiveNumber(castLength - 1, 0);
        expect(
          elements.itemsSubtitles(component)[selectedItemIndex].children[0],
        ).toEqual(castItems[selectedItemIndex].character);
        await waitFor(() => {});
      });

      it('should render correctly when has no data to be shown', async () => {
        const component = render(renderPeopleList([]));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(0);
        expect(elements.sectionTitle(component)).not.toBeNull();
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        await waitFor(() => {});
      });
    });

    describe('Pressing the items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const castLength = randomPositiveNumber(25, 1);
        const castItems = cast(castLength);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(castLength - 1, 0);
        const component = render(renderPeopleList(castItems, onPressItem));
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.listItems(component)[indexItemSelected]);
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith(
          castItems[indexItemSelected].id,
          castItems[indexItemSelected].name,
          castItems[indexItemSelected].profilePath,
        );
        await waitFor(() => {});
      });
    });
  });

  describe('When it has more than $LIST_BATCH_ITEMS_COUNT items to show', () => {
    describe('Renders correctly', () => {
      it('should render correctly when has some data to be shown', async () => {
        const castLenght = randomPositiveNumber(
          100,
          LIST_BATCH_ITEMS_COUNT + 1,
        );
        const component = render(renderPeopleList(cast(castLenght)));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(
          LIST_BATCH_ITEMS_COUNT,
        );
        expect(elements.sectionTitle(component)).not.toBeNull();
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        await waitFor(() => {});
      });

      it('should parse the "cast" items to the "people-list-item" correctly when "character" is undefined"', async () => {
        const castItems = cast(randomPositiveNumber(100, 26), false);
        const component = render(renderPeopleList(castItems));
        const selectedItem = randomArrayElement(
          elements.itemsSubtitles(component),
        );
        expect(selectedItem.children[0]).toEqual('-');
        await waitFor(() => {});
      });

      it('should parse the "cast" items to the "people-list-item" correctly when "character" is defined"', async () => {
        const castLength = randomPositiveNumber(
          100,
          LIST_BATCH_ITEMS_COUNT + 1,
        );
        const castItems = cast(castLength);
        const component = render(renderPeopleList(castItems));
        const selectedItemIndex = randomPositiveNumber(
          LIST_BATCH_ITEMS_COUNT - 1,
          0,
        );
        expect(
          elements.itemsSubtitles(component)[selectedItemIndex].children[0],
        ).toEqual(castItems[selectedItemIndex].character);
        await waitFor(() => {});
      });

      it('should render correctly when has no data to be shown', async () => {
        const component = render(renderPeopleList([]));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(0);
        expect(elements.sectionTitle(component)).not.toBeNull();
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        await waitFor(() => {});
      });
    });

    describe('Pressing the items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const castLength = randomPositiveNumber(100, 26);
        const castItems = cast(castLength);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(
          LIST_BATCH_ITEMS_COUNT - 1,
          0,
        );
        const component = render(renderPeopleList(castItems, onPressItem));
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.listItems(component)[indexItemSelected]);
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith(
          castItems[indexItemSelected].id,
          castItems[indexItemSelected].name,
          castItems[indexItemSelected].profilePath,
        );
        await waitFor(() => {});
      });
    });
  });
});
