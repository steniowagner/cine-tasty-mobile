import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {ThemeProvider} from 'styled-components/native';
import {randomPositiveNumber} from '@mocks/utils';

import * as SchemaTypes from '@schema-types';
import {dark} from '@styles/themes/dark';

import {PeopleList} from './PeopleList';

const SECTION_TITLE = 'CREATORS';

const creators = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      __typename: 'Creator',
      profilePath: `PROFILE_PATH_${index}`,
      name: `NAME_${index}`,
      id: `ID_${index}`,
    })) as SchemaTypes.TVShowDetail_tvShow_createdBy[];

const renderPeopleList = (
  dataset: SchemaTypes.TVShowDetail_tvShow_createdBy[],
  onPressItem = jest.fn(),
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={dark}>
      <PeopleList
        sectionTitle={SECTION_TITLE}
        onPressItem={onPressItem}
        dataset={dataset}
        type="creator"
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<PeopleList /> - [Creators]', () => {
  const elements = {
    listItems: (api: RenderAPI) =>
      api.queryAllByTestId('button-wrapper-creator'),
    list: (api: RenderAPI) => api.queryByTestId('people-list-creator'),
    sectionTitle: (api: RenderAPI) => api.queryByTestId('section-title'),
    itemsSubtitles: (api: RenderAPI) => api.queryAllByTestId('person-subtext'),
  };

  describe('Renders correctly', () => {
    it('should render correctly when has some data to be shown', async () => {
      const creatorsLenght = randomPositiveNumber(10, 1);
      const component = render(renderPeopleList(creators(creatorsLenght)));
      expect(elements.list(component)).not.toBeNull();
      expect(elements.listItems(component).length).toEqual(creatorsLenght);
      expect(elements.sectionTitle(component)).not.toBeNull();
      expect(elements.sectionTitle(component).children[0]).toEqual(
        SECTION_TITLE,
      );
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

    it('should not render the "subtitle" field on the "people-list-items"', async () => {
      const creatorsItems = creators(randomPositiveNumber(10, 1));
      const component = render(renderPeopleList(creatorsItems));
      expect(elements.itemsSubtitles(component).length).toEqual(0);
      await waitFor(() => {});
    });
  });

  describe('Pressing the items', () => {
    it('should call the "onPressItem" correctly when the user press some item on the list', async () => {
      const creatorsLength = randomPositiveNumber(10, 1);
      const creatorsItems = creators(creatorsLength);
      const onPressItem = jest.fn();
      const indexItemSelected = randomPositiveNumber(creatorsLength - 1, 0);
      const component = render(renderPeopleList(creatorsItems, onPressItem));
      expect(onPressItem).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.listItems(component)[indexItemSelected]);
      expect(onPressItem).toHaveBeenCalledTimes(1);
      expect(onPressItem).toHaveBeenCalledWith(
        creatorsItems[indexItemSelected].id,
        creatorsItems[indexItemSelected].name,
        creatorsItems[indexItemSelected].profilePath,
      );
      await waitFor(() => {});
    });
  });
});
