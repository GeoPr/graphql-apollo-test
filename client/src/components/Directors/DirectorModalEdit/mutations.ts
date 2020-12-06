import { gql } from 'apollo-boost'

export const editDirector = gql`
	mutation editDirector($id: ID, $name: String!, $age: Int!) {
		updateDirector(id: $id, name: $name, age: $age) {
			name
			age
			id
			movies {
				name
			}
		}
	}
`