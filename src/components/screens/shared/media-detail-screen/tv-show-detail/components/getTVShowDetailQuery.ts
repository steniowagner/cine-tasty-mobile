import gql from 'graphql-tag';

export default gql`
  query TVShowDetail(
    $id: ID!
    $language: ISO6391Language
    $withVoteAverage: Boolean!
    $withGenresIds: Boolean!
    $withVoteCount: Boolean!
  ) {
    tvShow(id: $id, language: $language) {
      genres(language: $language) @include(if: $withGenresIds)
      voteAverage @include(if: $withVoteAverage)
      voteCount @include(if: $withVoteCount)
      images(id: $id)
      backdropPath
      createdBy {
        profilePath
        name
        id
      }
      networks {
        logoPath
        name
        id
      }
      episodeRunTime
      firstAirDate
      lastAirDate
      name
      id
      productionCompanies {
        logoPath
        name
        id
      }
      originalLanguage
      originalName
      originCountry
      overview
      videos {
        thumbnail {
          extraSmall
        }
        key
        id
      }
      cast {
        profilePath
        character
        name
        id
      }
      crew {
        profilePath
        name
        id
        job
      }
      similar {
        voteAverage
        posterPath
        voteCount
        name
        id
      }
      posterPath
      numberOfEpisodes
      numberOfSeasons
      reviews {
        author
        content
        id
      }
    }
  }
`;
