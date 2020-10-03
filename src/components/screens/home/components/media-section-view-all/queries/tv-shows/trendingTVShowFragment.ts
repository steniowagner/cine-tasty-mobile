import gql from 'graphql-tag';

export default gql`
  fragment TrendingTVShowFragment on BaseTVShow {
    voteAverage
    title: name
    posterPath
    voteCount
    genreIds
    id
  }
`;
