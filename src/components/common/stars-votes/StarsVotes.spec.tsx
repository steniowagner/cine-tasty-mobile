import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

import StarsVotes from './StarsVotes';

const renderStarsVotes = (withText: boolean, votes: number, voteCount?: number) => (
  <ThemeProvider theme={theme}>
    <StarsVotes withText={withText} votes={votes} voteCount={voteCount} />
  </ThemeProvider>
);

describe('Testing <StarsVotes />', () => {
  it('should render correctly when the "withText" prop is "true"', () => {
    const { getByTestId, getByText } = render(renderStarsVotes(true, 5, 10));

    expect(getByText('5.0 ')).not.toBeNull();

    expect(getByText(' (10)')).not.toBeNull();

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('stars-wrapper').children.length).toEqual(3);
  });

  it('should render correctly when the "withText" prop is "false"', () => {
    const { getByTestId, queryByText } = render(renderStarsVotes(false, 5, 10));

    expect(queryByText('5.0')).toBeNull();

    expect(queryByText(' (10)')).toBeNull();

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('stars-wrapper').children.length).toEqual(3);
  });

  it('should render correct sequence of stars for "votes = 0"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 0));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(queryByTestId('full-stars-wrapper')).toBeNull();

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(5);
  });

  it('should render correct sequence of stars for "votes = 0.2"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 0.2));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(queryByTestId('full-stars-wrapper')).toBeNull();

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(4);
  });

  it('should render correct sequence of stars for "votes = 0.5"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 0.5));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(queryByTestId('full-stars-wrapper')).toBeNull();

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(4);
  });

  it('should render correct sequence of stars for "votes = 1"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 0.5));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(queryByTestId('full-stars-wrapper')).toBeNull();

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(4);
  });

  it('should render correct sequence of stars for "votes = 2"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 2));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(4);
  });

  it('should render correct sequence of stars for "votes = 2.3"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 2.3));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(3);
  });

  it('should render correct sequence of stars for "votes = 2.8"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 2.8));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(3);
  });

  it('should render correct sequence of stars for "votes = 4.8"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 4.8));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(2);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(2);
  });

  it('should render correct sequence of stars for "votes = 5"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 5));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(2);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(2);
  });

  it('should render correct sequence of stars for "votes = 6"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 6));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(3);

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(2);
  });

  it('should render correct sequence of stars for "votes = 6"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 6));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(3);

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(2);
  });

  it('should render correct sequence of stars for "votes = 6.8"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 6.8));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(3);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(1);
  });

  it('should render correct sequence of stars for "votes = 7.5"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 7.5));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(3);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(getByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(1);
  });

  it('should render correct sequence of stars for "votes = 8.2"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 8.2));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(4);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(queryByTestId('empty-stars-wrapper')).toBeNull();
  });

  it('should render correct sequence of stars for "votes = 9.4"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 9.4));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(4);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(queryByTestId('empty-stars-wrapper')).toBeNull();
  });

  it('should render correct sequence of stars for "votes = 9.9"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 9.9));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(4);

    expect(getByTestId('half-stars-wrapper')).not.toBeNull();

    expect(getByTestId('half-stars-wrapper').children.length).toEqual(1);

    expect(queryByTestId('empty-stars-wrapper')).toBeNull();
  });

  it('should render correct sequence of stars for "votes = 10"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 10));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(5);

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(queryByTestId('empty-stars-wrapper')).toBeNull();
  });

  it('should render correct sequence of stars for "votes = 25"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, 25));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper')).not.toBeNull();

    expect(getByTestId('full-stars-wrapper').children.length).toEqual(5);

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(queryByTestId('empty-stars-wrapper')).toBeNull();
  });

  it('should render correct sequence of stars for "votes = -1"', () => {
    const { queryByTestId, getByTestId } = render(renderStarsVotes(false, -1));

    expect(getByTestId('stars-wrapper')).not.toBeNull();

    expect(queryByTestId('full-stars-wrapper')).toBeNull();

    expect(queryByTestId('half-stars-wrapper')).toBeNull();

    expect(queryByTestId('empty-stars-wrapper')).not.toBeNull();

    expect(getByTestId('empty-stars-wrapper').children.length).toEqual(5);
  });
});
