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


export const CREATE_USER=gql`
mutation createUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    firstName
    lastName
    email
    password
  }
}

`