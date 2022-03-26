import React from 'react';
import { fireEvent, cleanup, render, act } from '@testing-library/react-native';

import { TMDBImageQualityProvider } from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import { ThemeContextProvider } from '@providers';
import * as fixtures from '@mocks/fixtures';

import PersonList from './PeopleList';

const renderPersonList = ({ sectionTitle, onPressItem, dataset, type }) => (
  <TMDBImageQualityProvider>
    <ThemeContextProvider>
      <PersonList
        sectionTitle={sectionTitle}
        onPressItem={onPressItem}
        dataset={dataset}
        type={type}
      />
    </ThemeContextProvider>
  </TMDBImageQualityProvider>
);

describe('Testing <PeopleList />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(cleanup);

  it('it should render correctly for "cast"', () => {
    const sectionTitle = 'Cast';

    const { getAllByTestId, getByTestId, getByText } = render(
      renderPersonList({
        dataset: fixtures.peopleListCast,
        onPressItem: jest.fn,
        type: 'cast',
        sectionTitle,
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText(sectionTitle)).not.toBeNull();

    expect(getByTestId('people-list-cast')).not.toBeNull();

    expect(getAllByTestId('button-wrapper-cast').length).toEqual(
      fixtures.peopleListCast.length,
    );

    expect(getAllByTestId('person-image').length).toEqual(fixtures.peopleListCast.length);

    expect(
      getAllByTestId('person-image').every((personSubtextInstance, index) => {
        const splittedUri = personSubtextInstance.props.source.uri.split('/');

        return (
          `/${splittedUri[splittedUri.length - 1]}` ===
          fixtures.peopleListCast[index].profilePath
        );
      }),
    ).toEqual(true);

    expect(getAllByTestId('person-name').length).toEqual(fixtures.peopleListCast.length);

    expect(
      getAllByTestId('person-name').every(
        (personNameInstance, index) =>
          personNameInstance.children[0] === fixtures.peopleListCast[index].name,
      ),
    ).toEqual(true);

    expect(getAllByTestId('person-subtext').length).toEqual(
      fixtures.peopleListCast.length,
    );

    expect(
      getAllByTestId('person-subtext').every(
        (personSubtextInstance, index) =>
          personSubtextInstance.children[0] === fixtures.peopleListCast[index].character,
      ),
    ).toEqual(true);
  });

  it('it should call the "onPressItem" function-param correctly when some list-item is pressed for "cast"', () => {
    const onPressItem = jest.fn();
    const INDEX_SELECTED = 1;

    const { getAllByTestId } = render(
      renderPersonList({
        sectionTitle: 'Cast',
        dataset: fixtures.peopleListCast,
        type: 'cast',
        onPressItem,
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('button-wrapper-cast')[INDEX_SELECTED]);

    expect(onPressItem).toHaveBeenCalledTimes(1);

    expect(onPressItem).toHaveBeenCalledWith(
      fixtures.peopleListCast[INDEX_SELECTED].id,
      fixtures.peopleListCast[INDEX_SELECTED].name,
      fixtures.peopleListCast[INDEX_SELECTED].profilePath,
    );
  });

  it('it should render correctly for "crew"', () => {
    const sectionTitle = 'Crew';

    const { getAllByTestId, getByTestId, getAllByText, getByText } = render(
      renderPersonList({
        dataset: fixtures.peopleListCrew,
        onPressItem: jest.fn,
        type: 'crew',
        sectionTitle,
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText(sectionTitle)).not.toBeNull();

    expect(getByTestId('people-list-crew')).not.toBeNull();

    expect(getAllByTestId('button-wrapper-crew').length).toEqual(
      fixtures.peopleListCrew.length,
    );

    expect(getAllByTestId('person-image').length).toEqual(fixtures.peopleListCrew.length);

    expect(
      getAllByTestId('person-image').every((personSubtextInstance, index) => {
        const splittedUri = personSubtextInstance.props.source.uri.split('/');

        return (
          `/${splittedUri[splittedUri.length - 1]}` ===
          fixtures.peopleListCrew[index].profilePath
        );
      }),
    ).toEqual(true);

    expect(getAllByTestId('person-name').length).toEqual(fixtures.peopleListCrew.length);

    expect(
      getAllByTestId('person-name').every(
        (personNameInstance, index) =>
          personNameInstance.children[0] === fixtures.peopleListCrew[index].name,
      ),
    ).toEqual(true);

    expect(getAllByTestId('person-subtext').length).toEqual(
      fixtures.peopleListCrew.length,
    );

    expect(
      getAllByTestId('person-subtext').every(
        (personSubtextInstance, index) =>
          personSubtextInstance.children[0] === fixtures.peopleListCrew[index].job,
      ),
    ).toEqual(true);
  });

  it('it should call the "onPressItem" function-param correctly when some list-item is pressed for "crew"', () => {
    const onPressItem = jest.fn();
    const INDEX_SELECTED = 1;

    const { getAllByTestId } = render(
      renderPersonList({
        sectionTitle: 'Crew',
        dataset: fixtures.peopleListCrew,
        type: 'crew',
        onPressItem,
      }),
    );

    act(() => {
      jest.runAllTimers();
    });

    fireEvent.press(getAllByTestId('button-wrapper-crew')[INDEX_SELECTED]);

    expect(onPressItem).toHaveBeenCalledTimes(1);

    expect(onPressItem).toHaveBeenCalledWith(
      fixtures.peopleListCrew[INDEX_SELECTED].id,
      fixtures.peopleListCrew[INDEX_SELECTED].name,
      fixtures.peopleListCrew[INDEX_SELECTED].profilePath,
    );
  });
});
