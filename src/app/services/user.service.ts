import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CREATE_USER, GET_USERS } from '../graphql.operations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo:Apollo) { }


  getAllUsers():Observable<any>{
  return this.apollo.watchQuery({
    query:GET_USERS
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
