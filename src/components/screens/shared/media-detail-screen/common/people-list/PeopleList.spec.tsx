import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import PersonList from './PeopleList';

const cast = Array(3)
  .fill({})
  .map((_, index) => ({
    profilePath: `/cast-profilePath${index}`,
    character: `character${index}`,
    name: `cast-name${index}`,
    id: `cast-id${index}`,
  }));

const crew = Array(3)
  .fill({})
  .map((_, index) => ({
    profilePath: `/crew-profilePath${index}`,
    department: `department${index}`,
    name: `crew-name${index}`,
    job: `job${index}`,
    id: `crew-id${index}`,
  }));

const renderPersonList = ({ sectionTitle, onPressItem, dataset, type }) => (
  <ThemeProvider theme={theme}>
    <PersonList
      sectionTitle={sectionTitle}
      onPressItem={onPressItem}
      dataset={dataset}
      type={type}
    />
  </ThemeProvider>
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
        onPressItem: jest.fn,
        dataset: cast,
        type: 'cast',
        sectionTitle,
      }),
    );

    expect(getByText(sectionTitle)).not.toBeNull();

    expect(getByTestId('people-list-cast')).not.toBeNull();

    expect(getAllByTestId('button-wrapper-cast').length).toEqual(cast.length);

    expect(getAllByTestId('person-image').length).toEqual(cast.length);

    expect(
      getAllByTestId('person-image').every((personSubtextInstance, index) => {
        const splittedUri = personSubtextInstance.props.source.uri.split('/');

        return `/${splittedUri[splittedUri.length - 1]}` === cast[index].profilePath;
      }),
    ).toEqual(true);

    expect(getAllByTestId('person-name').length).toEqual(cast.length);

    expect(
      getAllByTestId('person-name').every(
        (personNameInstance, index) =>
          personNameInstance.children[0] === cast[index].name,
      ),
    ).toEqual(true);

    expect(getAllByTestId('person-subtext').length).toEqual(cast.length);

    expect(
      getAllByTestId('person-subtext').every(
        (personSubtextInstance, index) =>
          personSubtextInstance.children[0] === cast[index].character,
      ),
    ).toEqual(true);
  });

  it('it should call the "onPressItem" function-param correctly when some list-item is pressed for "cast"', () => {
    const onPressItem = jest.fn();
    const INDEX_SELECTED = 1;

    const { getAllByTestId } = render(
      renderPersonList({
        sectionTitle: 'Cast',
        dataset: cast,
        type: 'cast',
        onPressItem,
      }),
    );

    fireEvent.press(getAllByTestId('button-wrapper-cast')[INDEX_SELECTED]);

    expect(onPressItem).toHaveBeenCalledTimes(1);

    expect(onPressItem).toHaveBeenCalledWith(
      cast[INDEX_SELECTED].id,
      cast[INDEX_SELECTED].name,
      cast[INDEX_SELECTED].profilePath,
    );
  });

  it('it should render correctly for "crew"', () => {
    const sectionTitle = 'Crew';

    const { getAllByTestId, getByTestId, getAllByText, getByText } = render(
      renderPersonList({
        onPressItem: jest.fn,
        dataset: crew,
        type: 'crew',
        sectionTitle,
      }),
    );

    expect(getByText(sectionTitle)).not.toBeNull();

    expect(getByTestId('people-list-crew')).not.toBeNull();

    expect(getAllByTestId('button-wrapper-crew').length).toEqual(crew.length);

    expect(getAllByTestId('person-image').length).toEqual(crew.length);

    expect(
      getAllByTestId('person-image').every((personSubtextInstance, index) => {
        const splittedUri = personSubtextInstance.props.source.uri.split('/');

        return `/${splittedUri[splittedUri.length - 1]}` === crew[index].profilePath;
      }),
    ).toEqual(true);

    expect(getAllByTestId('person-name').length).toEqual(crew.length);

    expect(
      getAllByTestId('person-name').every(
        (personNameInstance, index) =>
          personNameInstance.children[0] === crew[index].name,
      ),
    ).toEqual(true);

    expect(getAllByTestId('person-subtext').length).toEqual(crew.length);

    expect(
      getAllByTestId('person-subtext').every(
        (personSubtextInstance, index) =>
          personSubtextInstance.children[0] === crew[index].job,
      ),
    ).toEqual(true);
  });

  it('it should call the "onPressItem" function-param correctly when some list-item is pressed for "crew"', () => {
    const onPressItem = jest.fn();
    const INDEX_SELECTED = 1;

    const { getAllByTestId } = render(
      renderPersonList({
        sectionTitle: 'Crew',
        dataset: crew,
        type: 'crew',
        onPressItem,
      }),
    );

    fireEvent.press(getAllByTestId('button-wrapper-crew')[INDEX_SELECTED]);

    expect(onPressItem).toHaveBeenCalledTimes(1);

    expect(onPressItem).toHaveBeenCalledWith(
      crew[INDEX_SELECTED].id,
      crew[INDEX_SELECTED].name,
      crew[INDEX_SELECTED].profilePath,
    );
  });
});
