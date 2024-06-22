import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CREATE_USER, GET_USERS } from '../graphql.operations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo:Apollo) { }
  private getAuthHeaders() {
    // const token = localStorage.getItem('authToken'); 
    const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoicnJoMjJAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYWRtaW5ycmgyIiwibGFzdE5hbWUiOiJhZG1pbnJyaDIiLCJyb2xlIjoiYWRtaW4iLCJhcHByb3ZlZCI6dHJ1ZSwiaWF0IjoxNzE5MDAxMDAyLCJleHAiOjE3MTk2OTIyMDJ9.zjRgTX_NzWrADbfmHEF6hPWH4-Y2Abg5fXjG9prYK1U'
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers():Observable<any>{
  return this.apollo.watchQuery({
    query:GET_USERS,
    context: {
      headers: this.getAuthHeaders()
    }
  }).valueChanges
  }

  createUser(firstName:string,lastName:string,email:string,password:string):Observable<any>{
   return  this.apollo.mutate({
      mutation:CREATE_USER,
      variables:{
        createUserInput:{
          firstName,
          lastName,
          email,
          password
        }
      },
      refetchQueries:[
        {query:GET_USERS}
      ]
    })
  }

}
