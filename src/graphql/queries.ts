import gql from 'graphql-tag';

import { CineTastyQuery } from 'types';

const TrendingMovieFragment = gql`
  fragment TrendingMovieFragment on BaseMovie {
    voteAverage
    posterPath
    voteCount
    genreIds
    title
    id
  }
`;

const TrendingTVShowFragment = gql`
  fragment TrendingTVShowFragment on BaseTVShow {
    voteAverage
    title: name
    posterPath
    voteCount
    genreIds
    id
  }
`;

export const SEARCH_TV_SHOWS = gql`
  query SearchTVShow($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseTVShow {
          title: name
          voteAverage
          posterPath
          voteCount
          genreIds
          id
        }
      }
    }
  }
`;

export const SEARCH_MOVIES = gql`
  query SearchMovie($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BaseMovie {
          voteAverage
          posterPath
          voteCount
          genreIds
          title
          id
        }
      }
    }
  }
`;

export const SEARCH_PERSON = gql`
  query SearchPerson($input: SearchInput!) {
    search(input: $input) {
      totalResults
      hasMore
      items {
        ... on BasePerson {
          image: profilePath
          title: name
          id
        }
      }
    }
  }
`;

export const GET_FAMOUS = gql`
  query GetFamous($page: Int!) {
    people(page: $page) {
      hasMore
      items {
        profilePath
        name
        id
      }
    }
  }
`;

export const NOW_PLAYING_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingNowPlayingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      nowPlaying(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;

export const POPULAR_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingPopularMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      popular(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;

export const TOP_RATED_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingTopRatedMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      topRated(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;

export const UPCOMING_MOVIES = gql`
  ${TrendingMovieFragment}

  query TrendingUpcomingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      upcoming(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingMovieFragment
        }
      }
    }
  }
`;

export const AIRING_TODAY_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingAiringTodayTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      airingToday(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;

export const ON_THE_AIR_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingOnTheAirTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      onTheAir(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;

export const POPULAR_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingPopularTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      popular(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;

export const TOP_RATED_TV_SHOWS = gql`
  ${TrendingTVShowFragment}

  query TrendingTopRatedTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      topRated(args: { page: $page, language: $language }) {
        hasMore
        items {
          ...TrendingTVShowFragment
        }
      }
    }
  }
`;

export const GET_TRENDING_MOVIES = gql`
  fragment TrendingMovie on BaseMovie {
    voteAverage
    posterPath
    voteCount
    genreIds
    title
    id
  }

  query TrendingMovies($page: Int!, $language: ISO6391Language) {
    trendingMovies {
      nowPlaying(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
      popular(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
      topRated(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
      upcoming(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingMovie
        }
      }
    }
  }
`;

export const GET_TRENDING_TV_SHOWS = gql`
  fragment TrendingTVShow on BaseTVShow {
    voteAverage
    title: name
    posterPath
    voteCount
    genreIds
    id
  }

  query TrendingTVShows($page: Int!, $language: ISO6391Language) {
    trendingTvShows {
      onTheAir(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      airingToday(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      popular(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
      topRated(args: { page: $page, language: $language }) {
        totalResults
        totalPages
        hasMore
        items {
          ...TrendingTVShow
        }
      }
    }
  }
`;

export const GET_ARTICLES = gql`
  query GetArticles($page: Int!, $language: ArticleLanguage!) {
    articles(page: $page, language: $language) {
      items {
        publishedAt
        content
        source
        author
        title
        image
        url
        id
      }
      hasMore
    }
  }
`;

export const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions($input: QuizInput!) {
    quiz(input: $input) {
      correctAnswer
      category
      question
      options
      type
    }
  }
`;

export const GET_FAMOUS_DETAIL = gql`
  query GetFamousDetail($id: Int!, $language: ISO6391Language) {
    person(id: $id, language: $language) {
      knownForDepartment
      placeOfBirth
      biography
      birthday
      deathday
      images
      moviesCast {
        voteAverage
        posterPath
        voteCount
        title
        id
      }
      tvCast {
        voteAverage
        posterPath
        voteCount
        name
        id
      }
    }
  }
`;

export const TV_SHOW_SEASONS_DETAIL = gql`
  query TVShowSeasonsDetail($id: ID!, $season: Int!, $language: ISO6391Language) {
    tvShowSeason(id: $id, season: $season, language: $language) {
      seasonNumber
      posterPath
      overview
      id
      episodes {
        voteAverage
        stillPath
        voteCount
        overview
        airDate
        name
        id
      }
    }
  }
`;

export const GET_TV_SHOW_DETAIL = gql`
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

export const GET_MOVIE_DETAIL = gql`
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

export const getQuery = (queryId: CineTastyQuery) => {
  switch (queryId) {
    case 'search_tv':
      return SEARCH_TV_SHOWS;
    case 'search_movie':
      return SEARCH_MOVIES;
    case 'search_famous':
      return SEARCH_PERSON;
    default:
      return undefined;
  }
};
