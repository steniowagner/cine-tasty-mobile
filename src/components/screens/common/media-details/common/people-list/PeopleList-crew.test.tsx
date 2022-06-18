import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {randomPositiveNumber, randomArrayElement} from '@mocks/utils';
import {ThemeProvider} from 'styled-components/native';
import {dark} from '@styles/themes/dark';
import * as Types from '@local-types';

import {LIST_BATCH_ITEMS_COUNT, PeopleList} from './PeopleList';

const SECTION_TITLE = 'CREW';

const crew = (length: number, withJob = true) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      job: withJob ? `JOB_${index}` : undefined,
      __typename: 'CrewItem',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as Types.CrewDataset;

const renderPeopleList = (
  dataset: Types.CrewDataset,
  onPressItem = jest.fn(),
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={dark}>
      <PeopleList
        sectionTitle={SECTION_TITLE}
        onPressItem={onPressItem}
        dataset={dataset}
        type="crew"
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<PeopleList /> - [Crew]', () => {
  const elements = {
    listItems: (api: RenderAPI) => api.queryAllByTestId('button-wrapper-crew'),
    list: (api: RenderAPI) => api.queryByTestId('people-list-crew'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    itemsSubtitles: (api: RenderAPI) => api.queryAllByTestId('person-subtext'),
  };

  describe('When it has up until $LIST_BATCH_ITEMS_COUNT items to show', () => {
    describe('Renders correctly', () => {
      it('should render correctly when has some data to be shown', async () => {
        const crewLenght = randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1);
        const component = render(renderPeopleList(crew(crewLenght)));
        expect(elements.list(component)).not.toBeNull();
        expect(elements.listItems(component).length).toEqual(crewLenght);
        expect(elements.sectionTitle(component)).not.toBeNull();
        expect(elements.sectionTitle(component).children[0]).toEqual(
          SECTION_TITLE,
        );
        await waitFor(() => {});
      });

      it('should parse the "crew" items to the "people-list-item" correctly when "job" is undefined"', async () => {
        const crewItems = crew(
          randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1),
          false,
        );
        const component = render(renderPeopleList(crewItems));
        const selectedItem = randomArrayElement(
          elements.itemsSubtitles(component),
        );
        expect(selectedItem.children[0]).toEqual('-');
        await waitFor(() => {});
      });

      it('should parse the "crew" items to the "people-list-item" correctly when "job" is defined"', async () => {
        const crewLength = randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1);
        const crewItems = crew(crewLength);
        const component = render(renderPeopleList(crewItems));
        const selectedItemIndex = randomPositiveNumber(crewLength - 1, 0);
        expect(
          elements.itemsSubtitles(component)[selectedItemIndex].children[0],
        ).toEqual(crewItems[selectedItemIndex].job);
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

      it('should show the "crew-items" correctly when they appear multiple times on the "people-list"', async () => {
        const crewLength = randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1);
        const crewItems = crew(crewLength);
        const selectedItemIndex = randomPositiveNumber(crewLength - 1, 0);
        const component = render(
          renderPeopleList([...crewItems, crewItems[selectedItemIndex]]),
        );
        expect(
          elements.itemsSubtitles(component)[selectedItemIndex].children[0],
        ).toEqual(
          `${crewItems[selectedItemIndex].job}/${crewItems[selectedItemIndex].job}`,
        );
        await waitFor(() => {});
      });
    });

    describe('Pressing the items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const crewLength = randomPositiveNumber(LIST_BATCH_ITEMS_COUNT, 1);
        const crewItems = crew(crewLength);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(crewLength - 1, 0);
        const component = render(renderPeopleList(crewItems, onPressItem));
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.listItems(component)[indexItemSelected]);
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith(
          crewItems[indexItemSelected].id,
          crewItems[indexItemSelected].name,
          crewItems[indexItemSelected].profilePath,
        );
        await waitFor(() => {});
      });
    });
  });

  describe('When it has more than $LIST_BATCH_ITEMS_COUNT items to show', () => {
    describe('Renders correctly', () => {
      it('should render correctly when has some data to be shown', async () => {
        const crewLenght = randomPositiveNumber(
          100,
          LIST_BATCH_ITEMS_COUNT + 1,
        );
        const component = render(renderPeopleList(crew(crewLenght)));
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

      it('should parse the "crew" items to the "people-list-item" correctly when "job" is undefined"', async () => {
        const crewItems = crew(
          randomPositiveNumber(100, LIST_BATCH_ITEMS_COUNT + 1),
          false,
        );
        const component = render(renderPeopleList(crewItems));
        const selectedItem = randomArrayElement(
          elements.itemsSubtitles(component),
        );
        expect(selectedItem.children[0]).toEqual('-');
        await waitFor(() => {});
      });

      it('should parse the "crew" items to the "people-list-item" correctly when "job" is defined"', async () => {
        const crewLength = randomPositiveNumber(
          100,
          LIST_BATCH_ITEMS_COUNT + 1,
        );
        const crewItems = crew(crewLength);
        const component = render(renderPeopleList(crewItems));
        const selectedItemIndex = randomPositiveNumber(
          LIST_BATCH_ITEMS_COUNT,
          0,
        );
        expect(
          elements.itemsSubtitles(component)[selectedItemIndex].children[0],
        ).toEqual(crewItems[selectedItemIndex].job);
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

      it('should show the "crew-items" correctly when they appear multiple times on the "people-list"', async () => {
        const crewLength = randomPositiveNumber(
          100,
          LIST_BATCH_ITEMS_COUNT + 1,
        );
        const crewItems = crew(crewLength);
        const selectedItemIndex = randomPositiveNumber(
          LIST_BATCH_ITEMS_COUNT - 1,
          0,
        );
        const component = render(
          renderPeopleList([...crewItems, crewItems[selectedItemIndex]]),
        );
        expect(
          elements.itemsSubtitles(component)[selectedItemIndex].children[0],
        ).toEqual(
          `${crewItems[selectedItemIndex].job}/${crewItems[selectedItemIndex].job}`,
        );
        await waitFor(() => {});
      });
    });

    describe('Pressing the items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const crewLength = randomPositiveNumber(
          100,
          LIST_BATCH_ITEMS_COUNT + 1,
        );
        const crewItems = crew(crewLength);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(
          LIST_BATCH_ITEMS_COUNT - 1,
          0,
        );
        const component = render(renderPeopleList(crewItems, onPressItem));
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(elements.listItems(component)[indexItemSelected]);
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith(
          crewItems[indexItemSelected].id,
          crewItems[indexItemSelected].name,
          crewItems[indexItemSelected].profilePath,
        );
        await waitFor(() => {});
      });
    });
  });
});