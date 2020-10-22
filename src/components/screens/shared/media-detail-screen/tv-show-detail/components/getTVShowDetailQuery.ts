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
      seasons {
        airDate
        episodeCount
        id
        name
        overview
        posterPath
        seasonNumber
      }
      backdropPath
      createdBy {
        id
        name
        profilePath
      }
      networks {
        name
        id
        logoPath
        originCountry
      }
      episodeRunTime
      firstAirDate
      homepage
      id
      inProduction
      languages
      lastAirDate
      name
      status
      type
      productionCompanies {
        id
        logoPath
        name
        originCountry
      }
      originalLanguage
      originalName
      overview
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
      cast {
        name
        profilePath
        id
        character
        gender
        order
      }
      crew {
        department
        id
        job
        name
        gender
        profilePath
      }
      similar {
        originCountry
        originalName
        name
        firstAirDate
        backdropPath
        genreIds
        overview
        voteAverage
        posterPath
        popularity
        originalLanguage
        voteCount
        id
      }
      popularity
      posterPath
      numberOfEpisodes
      numberOfSeasons
      originCountry
      reviews {
        author
        content
        id
        url
      }
    }
  }
`;
