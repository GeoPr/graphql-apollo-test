import { gql } from 'apollo-boost'

export const createMovie = gql`
	mutation createMovie($directorId: String!, $MName: String!, $genre: String!) {
		addMovie(MName: $MName, directorId: $directorId, genre: $genre) {
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