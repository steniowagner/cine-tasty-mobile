import React from 'react';
import {fireEvent, cleanup, render, act} from '@testing-library/react-native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';
import {getMockedTVShowSeason} from '@mocks/fixtures';
import {navigation} from '@mocks/navigationMock';
import {ThemeContextProvider} from '@providers';
import {Routes} from '@routes/routes';
import * as Types from '@local-types';

import {ANIMATION_TIMING} from './useCustomizedModal';
import CustomizedModal from './CustomizedModal';

const episode = getMockedTVShowSeason(1).episodes[0];

const renderCustomizedModal = (goBack = jest.fn) => (
  <ThemeContextProvider>
    <TMDBImageQualityProvider>
      <CustomizedModal
        navigation={{...navigation, goBack}}
        route={{
          name: Routes.CustomModal.CUSTOM_MODAL_STACK,
          key: `${Routes.CustomModal.CUSTOM_MODAL_STACK}-key`,
          params: {
            type: Types.CustomizedModalChildrenType.TV_SHOW_EPISODE_DETAILS,
            extraData: {
              dataset: [episode],
            },
          },
        }}
      />
    </TMDBImageQualityProvider>
  </ThemeContextProvider>
);

describe('Testing <CustomizedModal /> -- TVShowEpisodeDetail', () => {
  beforeEach(setupTimeTravel);

  afterEach(cleanup);

  it('should render correctly', () => {
    const {getByTestId} = render(renderCustomizedModal());

    act(() => {
      timeTravel(ANIMATION_TIMING);
      jest.runAllTimers();
    });

    expect(getByTestId('customized-modal')).not.toBeNull();

    expect(getByTestId('card-wrapper')).not.toBeNull();

    expect(getByTestId('closeable-area')).not.toBeNull();

    expect(getByTestId('episode-title-text')).not.toBeNull();

    expect(getByTestId('episode-title-text').children[0]).toEqual(episode.name);

    expect(getByTestId('air-date-text')).not.toBeNull();

    expect(getByTestId('overview-text')).not.toBeNull();

    expect(getByTestId('episode-title-text').children[0]).toEqual(episode.name);

    expect(getByTestId('episode-image')).not.toBeNull();
  });

  it('should call onClose when the CloseableArea is pressed', () => {
    const onClose = jest.fn();

    const {getByTestId} = render(renderCustomizedModal(onClose));

    fireEvent.press(getByTestId('closeable-area'));

    act(() => {
      timeTravel(ANIMATION_TIMING);
      jest.runAllTimers();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
