import React from 'react';
import {Image} from 'react-native';
import {render, RenderAPI, waitFor} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {TMDBImageQualityProvider} from '@src/providers/tmdb-image-quality/TMDBImageQuality';
import {randomPositiveNumber} from '@mocks/utils';
import {dark} from '@styles/themes/dark';
import {Translations} from '@i18n/tags';

import {HeaderInfo} from './HeaderInfo';
import {act} from 'react-test-renderer';

const TITLE = 'SONME_TITLE';

const renderHeaderInfo = (
  isLoading: boolean,
  votesAverage: number,
  voteCount: number,
) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={dark}>
      <HeaderInfo
        imageURL="IMAGE_URL"
        isLoading={isLoading}
        votesAverage={votesAverage}
        voteCount={voteCount}
        posterURL="POSTER_URL"
        title={TITLE}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<HeaderInfo />', () => {
  const elements = {
    backgroundImage: (api: RenderAPI) =>
      api.queryByTestId('background-image-wrapper'),
    posterImage: (api: RenderAPI) => api.queryByTestId('poster-image'),
    title: (api: RenderAPI) => api.queryByTestId('media-title'),
    votesCount: (api: RenderAPI) => api.queryByTestId('media-votes-count'),
    votesText: (api: RenderAPI) => api.queryByTestId('media-votes-text'),
    votesAverage: (api: RenderAPI) => api.queryByTestId('media-votes-average'),
    loading: (api: RenderAPI) => api.queryByTestId('background-image-loading'),
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
    beforeEach(() => {
      jest.useFakeTimers();
    });
    it('should render correctly when it has all the data', async () => {
      const votesAverage = randomPositiveNumber(10, 1);
      const voteCount = randomPositiveNumber(10, 1);
      const component = render(
        renderHeaderInfo(false, votesAverage, voteCount),
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.posterImage(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      expect(elements.votesCount(component)).not.toBeNull();
      expect(elements.votesCount(component).children[0]).toEqual(
        `${voteCount}`,
      );
      expect(elements.votesText(component)).not.toBeNull();
      expect(elements.votesText(component).children[0]).toEqual(
        Translations.Tags.MEDIA_DETAIL_VOTES,
      );
      expect(elements.votesAverage(component)).not.toBeNull();
      expect(elements.votesAverage(component).children[0]).toEqual(
        `${votesAverage.toFixed(1)}`,
      );
      await waitFor(() => {});
    });

    it('should render correctly when "votesAverage" is "undefined"', async () => {
      const voteCount = randomPositiveNumber(10, 1);
      const component = render(renderHeaderInfo(false, undefined, voteCount));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.posterImage(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      expect(elements.votesCount(component)).toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.votesAverage(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when "voteCount" is "undefined"', async () => {
      const voteAverage = randomPositiveNumber(10, 1);
      const component = render(renderHeaderInfo(false, voteAverage, undefined));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.posterImage(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      expect(elements.votesCount(component)).toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.votesAverage(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should render correctly when both "voteAverage" and "voteCount" are "undefined"', async () => {
      const component = render(renderHeaderInfo(false, undefined, undefined));
      act(() => {
        jest.runAllTimers();
      });
      expect(elements.loading(component)).toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.posterImage(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      expect(elements.votesCount(component)).toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.votesAverage(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Loading State', () => {
    it('should render the "loading-state" correclty when "isLoading" is "true"', async () => {
      const component = render(renderHeaderInfo(true, undefined, undefined));
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.backgroundImage(component)).not.toBeNull();
      expect(elements.posterImage(component)).not.toBeNull();
      expect(elements.title(component)).not.toBeNull();
      expect(elements.title(component).children[0]).toEqual(TITLE);
      await waitFor(() => {});
    });
  });
});
