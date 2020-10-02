import gql from 'graphql-tag';

export default gql`
  fragment TrendingMovie on BaseMovie {
    voteAverage
    posterPath
    voteCount
    genreIds
    title
    id
  }
`;
