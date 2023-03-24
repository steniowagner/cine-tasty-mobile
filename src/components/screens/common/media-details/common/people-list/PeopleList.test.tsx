jest.unmock('react-native-reanimated');
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualitiesProvider} from '@src/providers/tmdb-image-qualities/TMDBImageQualities';
import {randomPositiveNumber, randomArrayElement} from '@mocks/utils';
import {dark} from '@styles/themes/dark';
import * as Types from '@local-types';
import * as SchemaTypes from '@schema-types';

import {PeopleList, Type} from './PeopleList';

const makeCrew = (length: number, withJob = true) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      job: withJob ? `JOB_${index}` : undefined,
      __typename: 'CrewItem',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as Types.CrewDataset;

const makeCast = (length: number, withCharacter = true) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      character: withCharacter ? `CHARACTER_${index}` : undefined,
      __typename: 'CastItem',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as Types.CastDataset;

const makeCreators = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'Creator',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as SchemaTypes.TVShowDetail_tvShow_createdBy[];

type RenderPeopleListProps = {
  dataset:
    | Types.CrewDataset
    | Types.CastDataset
    | SchemaTypes.TVShowDetail_tvShow_createdBy[];
  onPressItem?: jest.Mock;
  sectionTitle: string;
  type: Type;
};

const renderPeopleList = (props: RenderPeopleListProps) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={dark}>
      <PeopleList
        sectionTitle={props.sectionTitle}
        onPressItem={props.onPressItem || jest.fn()}
        dataset={props.dataset}
        type={props.type}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
);

describe('<PeopleList />', () => {
  const elements = (type: Type) => ({
    listItems: (api: RenderAPI) =>
      api.queryAllByTestId(`button-wrapper-${type}`),
    list: (api: RenderAPI) => api.queryByTestId(`people-list-${type}`),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    itemsSubtitles: (api: RenderAPI) => api.queryAllByTestId('person-subtext'),
  });

  describe('When "type" is "cast"', () => {
    afterEach(cleanup);

    const baseParams = {
      sectionTitle: 'Cast',
      type: 'cast' as Type,
    };

    describe('Rendering the list', () => {
      it('should render correctly when has some data to be shown', async () => {
        const castLenght = randomPositiveNumber(10, 1);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: makeCast(castLenght),
          }),
        );
        expect(elements(baseParams.type).list(component)).not.toBeNull();
        expect(elements(baseParams.type).listItems(component).length).toEqual(
          castLenght,
        );
        expect(
          elements(baseParams.type).sectionTitle(component),
        ).not.toBeNull();
        expect(
          elements(baseParams.type).sectionTitle(component).children[0],
        ).toEqual(baseParams.sectionTitle);
        await waitFor(() => {});
      });

      it('should parse the "cast" items to the "people-list-item" correctly when "character" is undefined"', async () => {
        const dataset = makeCast(randomPositiveNumber(10, 1), false);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset,
          }),
        );
        const selectedItem = randomArrayElement(
          elements(baseParams.type).itemsSubtitles(component),
        );
        expect(selectedItem.children[0]).toEqual('-');
        await waitFor(() => {});
      });

      it('should parse the "cast" items to the "people-list-item" correctly when "character" is defined"', async () => {
        const castLength = randomPositiveNumber(10, 1);
        const dataset = makeCast(castLength);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset,
          }),
        );
        const selectedItemIndex = randomPositiveNumber(castLength - 1, 0);
        expect(
          elements(baseParams.type).itemsSubtitles(component)[selectedItemIndex]
            .children[0],
        ).toEqual(dataset[selectedItemIndex].character);
        await waitFor(() => {});
      });

      it('should render correctly when has no data to be shown', async () => {
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: [],
          }),
        );
        expect(elements(baseParams.type).list(component)).not.toBeNull();
        expect(elements(baseParams.type).listItems(component).length).toEqual(
          0,
        );
        expect(
          elements(baseParams.type).sectionTitle(component),
        ).not.toBeNull();
        expect(
          elements(baseParams.type).sectionTitle(component).children[0],
        ).toEqual(baseParams.sectionTitle);
        await waitFor(() => {});
      });
    });

    describe('Pressing the list-items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const castLength = randomPositiveNumber(10, 1);
        const dataset = makeCast(castLength);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(castLength - 1, 0);
        const component = render(
          renderPeopleList({
            ...baseParams,
            onPressItem,
            dataset,
          }),
        );
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements(baseParams.type).listItems(component)[indexItemSelected],
        );
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith({
          id: dataset[indexItemSelected].id,
          name: dataset[indexItemSelected].name,
          image: dataset[indexItemSelected].profilePath,
        });
        await waitFor(() => {});
      });
    });
  });

  describe('When "type" is "crew"', () => {
    const baseParams = {
      sectionTitle: 'Crew',
      type: 'crew' as Type,
    };

    describe('Rendering the list', () => {
      it('should render correctly when has some data to be shown', async () => {
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: makeCrew(10),
          }),
        );
        expect(elements(baseParams.type).list(component)).not.toBeNull();
        expect(
          elements(baseParams.type).listItems(component).length,
        ).toBeGreaterThan(0);
        expect(
          elements(baseParams.type).sectionTitle(component),
        ).not.toBeNull();
        expect(
          elements(baseParams.type).sectionTitle(component).children[0],
        ).toEqual(baseParams.sectionTitle);
        await waitFor(() => {});
      });

      it('should parse the "crew" items to the "people-list-item" correctly when "job" is undefined"', async () => {
        const dataset = makeCrew(10, false);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset,
          }),
        );
        const selectedItem = randomArrayElement(
          elements(baseParams.type).itemsSubtitles(component),
        );
        expect(selectedItem.children[0]).toEqual('-');
        await waitFor(() => {});
      });

      it('should parse the "crew" items to the "people-list-item" correctly when "job" is defined"', async () => {
        const dataset = makeCrew(10);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset,
          }),
        );
        const selectedItemIndex = randomPositiveNumber(dataset.length - 1, 0);
        expect(
          elements(baseParams.type).itemsSubtitles(component)[selectedItemIndex]
            .children[0],
        ).toEqual(dataset[selectedItemIndex].job);
        await waitFor(() => {});
      });

      it('should render correctly when has no data to be shown', async () => {
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: [],
          }),
        );
        expect(elements(baseParams.type).list(component)).not.toBeNull();
        expect(elements(baseParams.type).listItems(component).length).toEqual(
          0,
        );
        expect(
          elements(baseParams.type).sectionTitle(component),
        ).not.toBeNull();
        expect(
          elements(baseParams.type).sectionTitle(component).children[0],
        ).toEqual(baseParams.sectionTitle);
        await waitFor(() => {});
      });

      it('should show the "crew-items" correctly when they appear multiple times on the "people-list"', async () => {
        const dataset = makeCrew(10);
        const selectedItemIndex = randomPositiveNumber(dataset.length - 1, 0);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: [...dataset, dataset[selectedItemIndex]],
          }),
        );
        expect(
          elements(baseParams.type).itemsSubtitles(component)[selectedItemIndex]
            .children[0],
        ).toEqual(
          `${dataset[selectedItemIndex].job}/${dataset[selectedItemIndex].job}`,
        );
        await waitFor(() => {});
      });
    });

    describe('Pressing the list-items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const dataset = makeCrew(10);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(dataset.length - 1, 0);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset,
            onPressItem,
          }),
        );
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements(baseParams.type).listItems(component)[indexItemSelected],
        );
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith({
          id: dataset[indexItemSelected].id,
          name: dataset[indexItemSelected].name,
          image: dataset[indexItemSelected].profilePath,
        });
        await waitFor(() => {});
      });
    });
  });

  describe('When "type" is "creator"', () => {
    const baseParams = {
      sectionTitle: 'Creators',
      type: 'creator' as Type,
    };

    describe('Renders correctly', () => {
      it('should render correctly when has some data to be shown', async () => {
        const creatorsLenght = randomPositiveNumber(10, 1);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: makeCreators(creatorsLenght),
          }),
        );
        expect(elements(baseParams.type).list(component)).not.toBeNull();
        expect(elements(baseParams.type).listItems(component).length).toEqual(
          creatorsLenght,
        );
        expect(
          elements(baseParams.type).sectionTitle(component),
        ).not.toBeNull();
        expect(
          elements(baseParams.type).sectionTitle(component).children[0],
        ).toEqual(baseParams.sectionTitle);
        await waitFor(() => {});
      });

      it('should render correctly when has no data to be shown', async () => {
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: [],
          }),
        );
        expect(elements(baseParams.type).list(component)).not.toBeNull();
        expect(elements(baseParams.type).listItems(component).length).toEqual(
          0,
        );
        expect(
          elements(baseParams.type).sectionTitle(component),
        ).not.toBeNull();
        expect(
          elements(baseParams.type).sectionTitle(component).children[0],
        ).toEqual(baseParams.sectionTitle);
        await waitFor(() => {});
      });

      it('should not render the "subtitle" field on the "people-list-items"', async () => {
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset: makeCreators(randomPositiveNumber(10, 1)),
          }),
        );
        expect(
          elements(baseParams.type).itemsSubtitles(component).length,
        ).toEqual(0);
        await waitFor(() => {});
      });
    });

    describe('Pressing the items', () => {
      it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
        const creatorsLength = randomPositiveNumber(10, 1);
        const dataset = makeCreators(creatorsLength);
        const onPressItem = jest.fn();
        const indexItemSelected = randomPositiveNumber(creatorsLength - 1, 0);
        const component = render(
          renderPeopleList({
            ...baseParams,
            dataset,
            onPressItem,
          }),
        );
        expect(onPressItem).toHaveBeenCalledTimes(0);
        fireEvent.press(
          elements(baseParams.type).listItems(component)[indexItemSelected],
        );
        expect(onPressItem).toHaveBeenCalledTimes(1);
        expect(onPressItem).toHaveBeenCalledWith({
          id: dataset[indexItemSelected].id,
          name: dataset[indexItemSelected].name,
          image: dataset[indexItemSelected].profilePath,
        });
        await waitFor(() => {});
      });
    });
  });
});
