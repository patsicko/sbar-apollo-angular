import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { GET_DEPARTMENTS, GET_UNITS,GET_PATIENTS_BY_UNITY, GET_SBARS, ADD_PATIENT, CREATE_SBAR, TRANSFER_PATIENT, ADD_DEPARTMENT, ADD_UNIT, CREATE_STAFF, GET_STAFF, ASSIGN_DEPARTMENT, GET_USERS, APPROVE_USER } from '../graphql.operations';
import { CookieService } from 'ngx-cookie-service';
import { AddPatientInput, AssignDepartmentInput, CreateDepartmentInput, CreateSbarInput, CreateStaffInput, CreateUnityInput, TransferPatientInput } from '../interfaces/user.dto';
import { query } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private apollo: Apollo,
    private cookieService: CookieService
  ) { }

  private getAuthHeaders() {
    const token = this.cookieService.get('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getDepartments(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_DEPARTMENTS,
      context: {
        headers: this.getAuthHeaders()
      }
    }).valueChanges;
  }

  getUnits(departmentId: number): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_UNITS,
      variables: { departmentId },
      context: {
        headers: this.getAuthHeaders()
      }
    }).valueChanges;
  }

  getPatients(unityId: number): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_PATIENTS_BY_UNITY,
      variables: { unityId },
      context: {
        headers: this.getAuthHeaders()
      }
    }).valueChanges;
  }

  addPatient(createPatientInput: AddPatientInput): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_PATIENT,
      variables: {
        createPatientInput
      },
      refetchQueries: [
        {
          query: GET_PATIENTS_BY_UNITY,
          variables: { unityId: createPatientInput.unityId }
        }
      ],
      context: {
        headers: this.getAuthHeaders()
      },
    });
  }

  transferPatient(transferPatientInput:TransferPatientInput):Observable<any>{
    return this.apollo.mutate({
      mutation:TRANSFER_PATIENT,
      variables:{
        transferPatientInput
      }
    })
  }


  createSbar(createSbarInput:CreateSbarInput):Observable<any>{
   return this.apollo.mutate({
    mutation:CREATE_SBAR,
    variables:{
      createSbarInput
    },
    context:{
      headers:this.getAuthHeaders()
    },
    refetchQueries:[
      {
        query:GET_SBARS,
        variables:{
          patientId:createSbarInput.patientId
        }
      }
    ]

   })
  }

  getSbars(patientId: number): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_SBARS,
      variables: { patientId },
      context: {
        headers: this.getAuthHeaders()
      }
    }).valueChanges;
  }

  addDepartment(createDepartmentInput:CreateDepartmentInput):Observable<any>{
    return this.apollo.mutate({
      mutation:ADD_DEPARTMENT,
      variables:{
        createDepartmentInput
      },

      refetchQueries: [
        {
          query: GET_DEPARTMENTS,
          context:{
            headers:this.getAuthHeaders()
          },
        }
      ],
      context:{
        headers:this.getAuthHeaders()
      },
    })
  }

  addUnit(createUnityInput:CreateUnityInput):Observable<any>{
    return this.apollo.mutate({
      mutation:ADD_UNIT,
      variables:{
        createUnityInput
      },

      refetchQueries:[
       {
        query:GET_UNITS,
        variables: { departmentId:createUnityInput.departmentId },
        context:{
          headers:this.getAuthHeaders()
        }

       }

      ],
      context:{
        headers:this.getAuthHeaders()
      },
    })
  }

  createStaff(createStaffInput:CreateStaffInput):Observable<any>{
  return this.apollo.mutate({
    mutation:CREATE_STAFF,
    variables:{
      createStaffInput
    },
  })
  }

  getStaff():Observable<any>{
  return this.apollo.watchQuery({
    query:GET_STAFF,
    context:{
      headers:this.getAuthHeaders()
    }
  }).valueChanges
  }

  assignDepartment(assignDepartmentInput:AssignDepartmentInput):Observable<any>{
    return this.apollo.mutate({
      mutation:ASSIGN_DEPARTMENT,
      variables:{
        assignDepartmentInput
      },
      context:{
        headers:this.getAuthHeaders()
      },
      refetchQueries:[
        {
          query:GET_USERS,
          context:{
            headers:this.getAuthHeaders()
          }
        }
      ]
    })
  }


  approveUser(userId:number):Observable<any>{
    return this.apollo.mutate({
      mutation:APPROVE_USER,
      variables:{
        userId
      },
      refetchQueries:[
        {
          query:GET_STAFF,
          context:{
            headers:this.getAuthHeaders()
          }
        }
      ]
    })
  }
}
