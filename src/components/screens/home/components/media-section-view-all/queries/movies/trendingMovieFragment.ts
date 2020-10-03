import gql from 'graphql-tag';

export default gql`
  fragment TrendingMovieFragment on BaseMovie {
    voteAverage
    posterPath
    voteCount
    genreIds
    title
    id
  }
`;
