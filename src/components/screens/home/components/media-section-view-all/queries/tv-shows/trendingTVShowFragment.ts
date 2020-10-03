import gql from 'graphql-tag';

export default gql`
  fragment TrendingTVShow on BaseTVShow {
    voteAverage
    title: name
    posterPath
    voteCount
    genreIds
    id
  }
`;
