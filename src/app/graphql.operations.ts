import { gql } from "apollo-angular";


export const GET_USERS=gql`

query GetAllUsers{
allUsers{
id

  firstName
  lastName
  email
  password
}
}
`