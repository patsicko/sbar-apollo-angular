import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from 'src/app/graphql.operations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users:any[]=[];
  error:any;

 constructor(private apollo:Apollo){}  
  ngOnInit(): void {
  this.apollo.watchQuery({
    query:GET_USERS
  }).valueChanges.subscribe(({data,error}:any)=>{
    this.users=data.allUsers;
    this.error=error

    console.log("data",data);
    console.log("users",data.allUsers)
  })
  }

}
