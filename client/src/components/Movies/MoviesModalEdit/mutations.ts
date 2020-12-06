import { gql } from 'apollo-boost'

export const editMovie = gql`
	mutation editMovie($id: ID, $name: String!, $genre: String! $directorId: String) {
		updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId) {
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