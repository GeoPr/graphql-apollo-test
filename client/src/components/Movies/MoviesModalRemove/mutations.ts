import { gql } from 'apollo-boost'

export const removeMovie = gql`
	mutation removeMovie($id: ID!) {
		removeMovie(id: $id) {
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