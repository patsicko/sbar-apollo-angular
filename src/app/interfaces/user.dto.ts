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
    unityId:number
  }

  export interface CreateSbarInput {
  patientId:number,
  situation:string,
  background:string,
  assessment:string,
  recommendation:string
  }