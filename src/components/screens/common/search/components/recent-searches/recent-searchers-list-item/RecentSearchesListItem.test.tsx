import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@providers';
import MockedNavigation from '@mocks/MockedNavigator';
import {dark as theme} from '@styles/themes/dark';

import {RecentSearchesListItem} from './RecentSearchesListItem';

const renderRecentSerachesListItem = (
  onPressRemove = jest.fn(),
  onPressItem = jest.fn(),
) => {
  const FamoustListComponent = () => (
    <TMDBImageQualityProvider>
      <ThemeProvider theme={theme}>
        <RecentSearchesListItem
          item={{title: 'TITLE', image: 'IMAGE', id: 123}}
          onPressRemove={onPressRemove}
          onPressItem={onPressItem}
        />
      </ThemeProvider>
    </TMDBImageQualityProvider>
  );
  return <MockedNavigation component={FamoustListComponent} />;
};

describe('<RecentSearchesListItem />', () => {
  const elements = {
    listItemButton: (api: RenderAPI) =>
      api.queryByTestId('recent-searches-list-item-button'),
    removeButton: (api: RenderAPI) =>
      api.queryByTestId('recent-searches-list-item-close-button'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  describe('Pressing buttons', () => {
    it('should call "onPressRemove" when the user press the "remove-recent-search-list-item" button', async () => {
      const onPressRemove = jest.fn();
      const component = render(renderRecentSerachesListItem(onPressRemove));
      expect(onPressRemove).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.removeButton(component));
      expect(onPressRemove).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });

    it('should call "onPressItem" when the user press the "remove-recent-search-list-item" button', async () => {
      const onPressItem = jest.fn();
      const component = render(
        renderRecentSerachesListItem(undefined, onPressItem),
      );
      expect(onPressItem).toHaveBeenCalledTimes(0);
      fireEvent.press(elements.listItemButton(component));
      expect(onPressItem).toHaveBeenCalledTimes(1);
      await waitFor(() => {});
    });
  });
});
