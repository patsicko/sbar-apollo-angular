export interface LoginInput{
    email:string,
    password:string
}

export interface CreateHospitalInput {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    hospitalName:string ,
    district: string,
    sector: string

  }

  export interface AddPatientInput{
    firstName: string,
    lastName: string,
    departmentId:number,
    unityId:number
  }

  export interface CreateSbarInput {
  patientId:number,
  situation:string,
  background:string,
  assessment:string,
  recommendation:string
  }

  export interface TransferPatientInput{
    patientId: number
    targetDepartmentId: number
    targetUnityId: number
  }

  export interface CreateDepartmentInput{
    name:string
  }

  export interface CreateUnityInput{
    name:string
    departmentId:number
  }

  export interface CreateStaffInput{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    hospitalId: number;
  }


  export interface AssignDepartmentInput{
    userId:number,
    departmentId:number,
    unityId:number

  }
