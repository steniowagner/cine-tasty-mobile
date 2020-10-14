import gql from 'graphql-tag';

export const GET_MOVIE_DETAIL = gql`
  query TVShowDetail($id: ID!, $language: ISO6391Language) {
    tvShow(id: $id, language: $language) {
      seasons {
        airDate
        episodeCount
        id
        name
        overview
        posterPath
        seasonNumber
      }
      lastEpisodeToAir {
        airDate
        episodeNumber
        id
        name
        overview
        productionCode
        seasonNumber
        showId
        stillPath
        voteAverage
        voteCount
      }
      backdropPath
      createdBy {
        id
        creditId
        name
        gender
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
      genres
      name
      status
      type
      voteAverage
      voteCount
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
