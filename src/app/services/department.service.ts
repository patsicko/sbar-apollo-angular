import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { GET_DEPARTMENTS, GET_UNITS,GET_PATIENTS_BY_UNITY, GET_SBARS, ADD_PATIENT } from '../graphql.operations';
import { CookieService } from 'ngx-cookie-service';
import { AddPatientInput } from '../interfaces/user.dto';


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

  getUnits(departmentId: string): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_UNITS,
      variables: { departmentId },
      context: {
        headers: this.getAuthHeaders()
      }
    }).valueChanges;
  }

  getPatients(unitId: string): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_PATIENTS_BY_UNITY,
      variables: { unitId },
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

  getSbars(patientId: string): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_SBARS,
      variables: { patientId },
      context: {
        headers: this.getAuthHeaders()
      }
    }).valueChanges;
  }
}
