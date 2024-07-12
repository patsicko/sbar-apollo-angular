import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit{

  staffs:any[]=[]

constructor(
  private departmentService:DepartmentService
){}

  ngOnInit(): void {
    this.departmentService.getStaff().subscribe({
      next:(result=>{
        console.log("result of staff",result)
       this.staffs=result.data.allUsers
      })
    })
  }

}
