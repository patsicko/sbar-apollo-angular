import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CREATE_HOSPITAL, CREATE_USER, GET_USERS, LOGIN } from '../graphql.operations';
import { CreateHospitalInput, LoginInput } from '../interfaces/user.dto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apollo:Apollo,
    private cookieService:CookieService

  ) { }
  private getAuthHeaders() {
 
    const token=this.cookieService.get('accessToken')
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

  login(loginInput:LoginInput):Observable<any>{
   return this.apollo.mutate({
    mutation:LOGIN,
    variables:{
      loginInput
    },
    context: {withCredentials: true }
    })
  }


createHospital(createHospitalInput:CreateHospitalInput):Observable<any>{
  return this.apollo.mutate({
    mutation:CREATE_HOSPITAL,
    variables:{
      createHospitalInput
    }
  })
}
  
}
