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
      adult
      backdropPath
      id
      originalLanguage
      originalTitle
      overview
      title
      releaseDate
      productionCompanies {
        id
        logoPath
        name
      }
      runtime
      status
      tagline
      budget
      revenue
      spokenLanguages
      productionCountries
      cast {
        name
        profilePath
        id
        character
      }
      crew {
        job
        id
        name
        profilePath
      }
      videos {
        thumbnail {
          extraSmall
          small
          medium
          large
          extraLarge
        }
        key
        name
        site
        id
        type
      }
      reviews {
        author
        content
        id
        url
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
