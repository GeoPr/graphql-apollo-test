import { gql } from 'apollo-boost'

export const createDirector = gql`
	mutation createDirector($DName: String!, $age: Int!) {
		addDirector(DName: $DName, age: $age) {
			name
			age
			id
			movies {
				name
			}
		}
	}
`