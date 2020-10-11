import gql from 'graphql-tag';

export const GET_MOVIE_DETAIL = gql`
  query MovieDetail($id: ID!, $language: ISO6391Language) {
    movie(id: $id, language: $language) {
      adult
      backdropPath
      genres(language: $language)
      id
      originalLanguage
      originalTitle
      overview
      posterPath
      popularity
      video
      title
      voteAverage
      releaseDate
      productionCompanies {
        id
        logoPath
        name
        originCountry
      }
      voteCount
      runtime
      status
      tagline
      budget
      homepage
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
        department
        id
        job
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
        originalTitle
        video
        title
        adult
        releaseDate
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
    }
  }
`;
