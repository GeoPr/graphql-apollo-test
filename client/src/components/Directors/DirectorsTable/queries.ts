import { IMovie } from '../../Movies/MoviesTable/queries'
import { gql } from 'apollo-boost'

export interface IDirector {
  id: string
  name: string
  age: number
  movies: Array<IMovie>
}

export interface IData {
  directors: Array<IDirector>
}

export const directosQuery = gql`
  query directosQuery {
    directors {
      id
      name
      age
      movies {
        name
      }
    }
  }
`