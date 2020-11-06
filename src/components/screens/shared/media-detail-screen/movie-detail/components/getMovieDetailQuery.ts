import gql from 'graphql-tag';

export default gql`
  query MovieDetail(
    $id: ID!
    $language: ISO6391Language
    $withVoteAverage: Boolean!
    $withGenresIds: Boolean!
    $withVoteCount: Boolean!
  ) {
    movie(id: $id, language: $language) {
      genres(language: $language) @include(if: $withGenresIds)
      voteAverage @include(if: $withVoteAverage)
      voteCount @include(if: $withVoteCount)
      images(id: $id)
      backdropPath
      id
      originalTitle
      overview
      title
      releaseDate
      productionCompanies {
        id
        logoPath
        name
      }
      budget
      revenue
      spokenLanguages
      productionCountries
      cast {
        profilePath
        character
        name
        id
      }
      crew {
        profilePath
        name
        job
        id
      }
      videos {
        thumbnail {
          extraSmall
        }
        key
        id
      }
      reviews {
        content
        author
        id
      }
      similar {
        voteAverage
        posterPath
        voteCount
        title
        id
      }
    }
  }
`;
