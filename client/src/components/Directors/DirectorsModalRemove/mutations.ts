import { gql } from 'apollo-boost'

export const removeDirector = gql`
	mutation removeDirector($id: ID!) {
		removeDirector(id: $id) {
			name
		}
	}
`