import { gql } from "apollo-angular";


export const GET_USERS=gql`

query getStaff{
  allUsers{
    id
    firstName
    lastName
    email
    role
    approved
    hospital{
      hospitalName
    }
    department{
      name
    }
    unity{
      name
    }
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

export const GET_PATIENTS_BY_UNITY = gql`
  query findPatientsByUnity($unityId:Int!){
  findPatientsByUnity(unityId:$unityId){
    id
    firstName
    lastName
    isActive
  }
}
`;


export const GET_SBARS = gql `
query findSbarsByPatient($patientId:Int!){
 findSbarsByPatient(patientId:$patientId){
    id
  situation
  background
  assessment
  recommendation
  createdBy{
    firstName
    lastName
    role
  }
  createdAt
  }

}
`

export const ADD_PATIENT = gql`

mutation createPatient($createPatientInput:CreatePatientInput!){
  createPatient(createPatientInput:$createPatientInput){
    id
    firstName
    lastName
    hospital{
    hospitalId
    hospitalName
    }
    department{
      id
      name
    }
    unity{
      id
      name
    }
  }
}
`

export const CREATE_SBAR = gql`
mutation createSbar($createSbarInput:CreateSbarInput!){
  createSbar(createSbarInput:$createSbarInput){
    id
    situation
    background
    assessment
    recommendation
    createdBy{
      id
      firstName
      lastName
      role

    }
  }
}
`



export const ADD_DEPARTMENT=gql`
mutation($createDepartmentInput:CreateDepartmentInput!){
  createDepartment(createDepartmentInput:$createDepartmentInput){
    id
    name
  }
}
`

export const ADD_UNIT = gql `
mutation createUnity(
$createUnityInput: CreateUnityInput!
){
  createUnity(createUnityInput:$createUnityInput){
    id
    name
  }
}
`

export const CREATE_STAFF = gql`
mutation createStaff($createStaffInput:CreateStaffInput!){
  createStaff(createStaffInput:$createStaffInput){
    id
    firstName
    lastName
    email
    role
  }
}
`

export const GET_STAFF=gql `
query getStaff{
  allUsers{
    id
    firstName
    lastName
    email
    role
    approved
    hospital{
      hospitalName
    }
  }
}
`

export const ASSIGN_DEPARTMENT=gql`
mutation($assignDepartmentInput:AssignDepartmentInput!){
  assignDepartment(assignDepartmentInput:$assignDepartmentInput){
    id
    firstName
    lastName
    email
    role
    department{
      name
    }
    unity{
      name
    }
  }
}
`

export const APPROVE_USER=gql`
mutation approveUser($userId:Int!){
  approveUser(id:$userId){
    id
    lastName
    approved
  }
}

`
export const REMOVE_USER= gql `
mutation removeUser($userId:Int!){
  removeUser(id:$userId){
    id
    firstName
    lastName
    email
  }
}

`

export const TRANSFER_PATIENT = gql `
 mutation transferPatientInput($transferPatientInput:TransferPatientInput!){
  transferPatient(transferPatientInput:$transferPatientInput){
    id
    firstName
    lastName
    department{
      id
      name
    }
    unity{
      id
      name
    }
  }
}

`
export const DELETE_DEPARTMENT= gql`
mutation removeDepartment($id: Int!) {
  removeDepartment(id: $id){
    success
    message
  }
}
`
export const REMOVE_UNIT= gql`
mutation removeUnity($id:Int!){
  removeUnity(id:$id){
    success
    message
  }
}
`

export const ARCHIVE_PATIENT = gql`
mutation archivePatient($patientId:Int!){
  archivePatient(patientId:$patientId){
    id
    firstName
    lastName
    isActive
  }
}
`
export const RESTORE_PATIENT = gql`
mutation restorePatient($patientId:Int!){
  restorePatient(patientId:$patientId){
    id
    firstName
    lastName
    isActive
  }
}
`

export const GET_ALL_PATIENTS=gql`

query{
 getPatients{
  id
  firstName
  lastName
  isActive
  sbars{
    situation
    background
    assessment
    recommendation
    createdBy{
      id
      lastName
      role
    }
    createdAt
  }
  hospital{
    hospitalId
    hospitalName
  }
  department{
    id
    name
  }
  
  unity{
    id
    name
  }
}
}

`