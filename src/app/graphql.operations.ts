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

export const LOGIN =gql`
mutation($loginInput:LoginInput!){
  login(loginInput:$loginInput){
    accessToken
  }
}
`

export const CREATE_HOSPITAL=gql`
mutation($createHospitalInput:CreateHospitalWithAdminInput!){
  createHospital(createHospitalInput:$createHospitalInput){
    hospitalId
    district
    sector
  }
}

`



export const GET_DEPARTMENTS = gql`
query GetDepartments{
  getDepartments{
    id
    name
    unities{
      id
      name
    }  
  }
}
`;

export const GET_UNITS = gql`
  query getUnities($departmentId:Int!){
  getUnities(departmentId:$departmentId){
    id
    name
    department{
      name
      id
    }
  }
}
`;

export const GET_PATIENTS = gql`
  query GetPatients($unitId: ID!) {
    unit(id: $unitId) {
      patients {
        id
        name
        age
        condition
      }
    }
  }
`;