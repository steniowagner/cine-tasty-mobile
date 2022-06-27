import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {randomPositiveNumber} from '@mocks/utils';

import {StarsVotes} from './StarsVotes';

const renderStarsVotes = (
  withText: boolean,
  votes: number,
  voteCount?: number,
) => (
  <ThemeProvider theme={theme}>
    <StarsVotes withText={withText} votes={votes} voteCount={voteCount} />
  </ThemeProvider>
);

describe('<StarsVotes />', () => {
  const elements = {
    votesText: (api: RenderAPI) => api.queryByTestId('votes-text'),
    voteCount: (api: RenderAPI) => api.queryByTestId('vote-count'),
    starsWrapper: (api: RenderAPI) => api.queryByTestId('stars-wrapper'),
    fullStarsWrapper: (api: RenderAPI) =>
      api.queryByTestId('full-stars-wrapper'),
    starsFullIcons: (api: RenderAPI) => api.queryAllByTestId('icon-star-full'),
    halfStarsWrapper: (api: RenderAPI) =>
      api.queryByTestId('half-stars-wrapper'),
    starsHalfIcons: (api: RenderAPI) => api.queryAllByTestId('icon-star-half'),
    emptyStarsWrapper: (api: RenderAPI) =>
      api.queryByTestId('empty-stars-wrapper'),
    starsEmptyIcons: (api: RenderAPI) =>
      api.queryAllByTestId('icon-star-empty'),
  };

  describe('When "withText" is "true"', () => {
    it('should render correctly when the "withText" prop is "true"', () => {
      const component = render(renderStarsVotes(true, 5, 10));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component).children[0]).toEqual('5.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(' (10)');
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(2);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 0.2"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 0.2, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('0.2 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 0.5"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 0.5, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('0.5 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 1"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 1, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('1.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 2"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 2, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('2.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(1);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 2.3"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 2.3, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('2.3 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(1);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(3);
    });

    it('should render correct sequence of stars for "votes = 2.8"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 2.8, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('2.8 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(1);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(3);
    });

    it('should render correct sequence of stars for "votes = 4.8"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 4.8, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('4.8 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(2);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 5"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 5, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('5.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(2);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 6"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 6, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('6.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 6.5"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 6.5, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('6.5 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(1);
    });

    it('should render correct sequence of stars for "votes = 6.8"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 6.8, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('6.8 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(1);
    });

    it('should render correct sequence of stars for "votes = 7.5"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 7.5, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('7.5 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(1);
    });

    it('should render correct sequence of stars for "votes = 8.2"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 8.2, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('8.2 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(4);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 9.4"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 9.4, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('9.4 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(4);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 9.9"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 9.9, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('9.9 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(4);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 10"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 10, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('10.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(5);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 25"', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, 25, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('10.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(5);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for negative votes', () => {
      const votesCount = randomPositiveNumber(100, 1);
      const component = render(renderStarsVotes(true, -1, votesCount));
      expect(elements.votesText(component).children[0]).toEqual('-1.0 ');
      expect(elements.voteCount(component).children[0]).toEqual(
        ` (${votesCount})`,
      );
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(5);
    });
  });

  describe('When "withText" is "false"', () => {
    it('should render correctly when the "withText" prop is "false"', () => {
      const component = render(renderStarsVotes(false, 5, 10));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(2);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 0"', () => {
      const component = render(renderStarsVotes(false, 0));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(5);
    });

    it('should render correct sequence of stars for "votes = 0.2"', () => {
      const component = render(renderStarsVotes(false, 0.2));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 0.5"', () => {
      const component = render(renderStarsVotes(false, 0.5));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 1"', () => {
      const component = render(renderStarsVotes(false, 1));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 2"', () => {
      const component = render(renderStarsVotes(false, 2));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(1);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(4);
    });

    it('should render correct sequence of stars for "votes = 2.3"', () => {
      const component = render(renderStarsVotes(false, 2.3));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(1);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(3);
    });

    it('should render correct sequence of stars for "votes = 2.8"', () => {
      const component = render(renderStarsVotes(false, 2.8));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(1);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(3);
    });

    it('should render correct sequence of stars for "votes = 4.8"', () => {
      const component = render(renderStarsVotes(false, 4.8));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(2);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 5"', () => {
      const component = render(renderStarsVotes(false, 5));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(2);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 6"', () => {
      const component = render(renderStarsVotes(false, 6));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(2);
    });

    it('should render correct sequence of stars for "votes = 6.5"', () => {
      const component = render(renderStarsVotes(false, 6.5));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(1);
    });

    it('should render correct sequence of stars for "votes = 6.8"', () => {
      const component = render(renderStarsVotes(false, 6.8));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(1);
    });

    it('should render correct sequence of stars for "votes = 7.5"', () => {
      const component = render(renderStarsVotes(false, 7.5));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(3);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(1);
    });

    it('should render correct sequence of stars for "votes = 8.2"', () => {
      const component = render(renderStarsVotes(false, 8.2));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(4);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 9.4"', () => {
      const component = render(renderStarsVotes(false, 9.4));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(4);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 9.9"', () => {
      const component = render(renderStarsVotes(false, 9.9));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(4);
      expect(elements.halfStarsWrapper(component)).not.toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(1);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 10"', () => {
      const component = render(renderStarsVotes(false, 10));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(5);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for "votes = 25"', () => {
      const component = render(renderStarsVotes(false, 25));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).not.toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(5);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(0);
    });

    it('should render correct sequence of stars for negative votes', () => {
      const component = render(renderStarsVotes(false, -1));
      expect(elements.starsWrapper(component)).not.toBeNull();
      expect(elements.votesText(component)).toBeNull();
      expect(elements.voteCount(component)).toBeNull();
      expect(elements.fullStarsWrapper(component)).toBeNull();
      expect(elements.starsFullIcons(component).length).toEqual(0);
      expect(elements.halfStarsWrapper(component)).toBeNull();
      expect(elements.starsHalfIcons(component).length).toEqual(0);
      expect(elements.emptyStarsWrapper(component)).not.toBeNull();
      expect(elements.starsEmptyIcons(component).length).toEqual(5);
    });
  });
});
