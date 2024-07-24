import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
constructor(
  private departmentService: DepartmentService,
  private fb:FormBuilder,
  private router:Router,
  private stateService: StateService,
  private toastr: ToastrService,
  private authService: AuthService,
  private spinner: NgxSpinnerService
){

}


patients:any[]=[]
showRestorePatientModal:boolean=false
patientId:any



ngOnInit(): void {
  this.spinner.show()
  this.departmentService.getAllPatients().subscribe({
    next:(result=>{
   if(result){
    this.patients=result.data.getPatients
    this.spinner.hide()
    

    console.log("all patients",result)
   }
    }),
    error:(error=>{
      this.spinner.hide()
      throw new Error(error.message)
    })
  })
}

restorePatient(patientId:number){
  this.patientId=patientId
  }
  
  confirmRestorePatient(){
    this.spinner.show()
    this.departmentService.restorePatient(this.patientId).subscribe({
      next:(result=>{
        this.spinner.hide()
        this.toastr.success("Patient is restored")
        this.showRestorePatientModal=false
       
      }),
      error:(error=>
      {
        this.showRestorePatientModal=false
        this.spinner.hide()
        this.toastr.error(error.message)
        throw new Error(error.message)
      }
      )
    })
  
  }

}
