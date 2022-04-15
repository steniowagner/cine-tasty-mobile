import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';

import {randomPositiveNumber} from '@mocks/utils';
import {ThemeProvider} from 'styled-components/native';
import {dark} from '@styles/themes/dark';

import {GeneralInfo, InfoItem} from './GeneralInfo';

const items = (length: number) =>
  Array(length)
    .fill({})
    .map((_, index) => ({
      title: `TITLE_${index}`,
      value: `VALUE_${index}`,
    }));

const renderGeneralInfo = (infoItems: InfoItem[]) => (
  <ThemeProvider theme={dark}>
    <GeneralInfo infoItems={infoItems} />
  </ThemeProvider>
);

describe('<GeneralInfo />', () => {
  const elements = {
    wrapper: (api: RenderAPI) => api.queryByTestId('general-info-wrapper'),
    itemsWrapper: (api: RenderAPI) =>
      api.queryAllByTestId(/general-info-wrapper-/),
    itemsTitle: (api: RenderAPI) => api.queryAllByTestId(/general-info-title-/),
    itemsValue: (api: RenderAPI) => api.queryAllByTestId(/general-info-value-/),
  };

  it('should render correctly when the "infoItems" has some data', () => {
    const itemsLength = randomPositiveNumber(10, 1);
    const dataset = items(itemsLength);
    const component = render(renderGeneralInfo(dataset));
    expect(elements.wrapper(component)).not.toBeNull();
    expect(elements.itemsWrapper(component).length).toEqual(itemsLength);
    expect(elements.itemsTitle(component).length).toEqual(itemsLength);
    expect(elements.itemsValue(component).length).toEqual(itemsLength);
  });

  it('should render all the items onn the correct sequence when "infoItems" has some data', () => {
    const itemsLength = randomPositiveNumber(10, 1);
    const dataset = items(itemsLength);
    const component = render(renderGeneralInfo(dataset));
    expect(elements.wrapper(component)).not.toBeNull();
    expect(elements.itemsWrapper(component).length).toEqual(itemsLength);
    expect(elements.itemsTitle(component).length).toEqual(itemsLength);
    expect(elements.itemsValue(component).length).toEqual(itemsLength);
    for (let i = 0; i < itemsLength; i++) {
      expect(elements.itemsTitle(component)[i].children[0]).toEqual(
        dataset[i].title,
      );
      expect(elements.itemsValue(component)[i].children[0]).toEqual(
        dataset[i].value,
      );
    }
  });

  it('should render correctly when the "infoItems" is an empty array', () => {
    const component = render(renderGeneralInfo([]));
    expect(elements.wrapper(component)).toBeNull();
    expect(elements.itemsWrapper(component).length).toEqual(0);
    expect(elements.itemsTitle(component).length).toEqual(0);
    expect(elements.itemsValue(component).length).toEqual(0);
  });
});
