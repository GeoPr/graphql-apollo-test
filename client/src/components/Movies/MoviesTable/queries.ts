import { gql } from 'apollo-boost'

export interface IMovie {
  id: string | number
  name: string
  genre: string
  director: {
    name: string
    id: number | string
  }
}

export interface IData {
  movies: Array<IMovie>
}

export const moviesQuery = gql`
  query getMovies {
    movies {
      id
      name
      genre
      director {
        name
        id
      }
    }
  }
`
