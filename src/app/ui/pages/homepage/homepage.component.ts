import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from 'src/app/graphql.operations';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users:any[]=[];
  error:any;

 constructor(private userService:UserService){}  
  ngOnInit(): void {
  this.userService.getAllUsers()
  .subscribe(({data,error}:any)=>{
    this.users=data.allUsers;
    this.error=error

    console.log("data",data);
    console.log("users",data.allUsers)
  })
  }

  createUser(){
 this.userService.createUser("angularUser","ng","ng@gmail.com","123").subscribe({
  next:(result)=>{
    console.log('User created:', result.data.createUser);
  },
  error:(error)=>{
    console.error('Error creating user:', error);
  }
 })
  }

}
