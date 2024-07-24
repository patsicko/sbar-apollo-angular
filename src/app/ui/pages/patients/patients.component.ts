import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TransferPatientInput } from 'src/app/interfaces/user.dto';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/department.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

transferForm:FormGroup

constructor(
  private departmentService: DepartmentService,
  private fb:FormBuilder,
  private router:Router,
  private stateService: StateService,
  private toastr: ToastrService,
  private authService: AuthService,
  private spinner: NgxSpinnerService
){
  this.transferForm = this.fb.group({
    department: [''],
    unit: ['']
  });
}

patients:any[]=[]
showArchivePatientModal:boolean=false
patientId:any
showTransferModal:boolean=false
targetDepartmentId:number|null=null
targetUnitId:number | null=null
selectedUnit: any;
selectedPatient: any;

departments: any[] = [];
  units: any[] = [];



ngOnInit(): void {
  this.getDepartments()
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

archivePatient(patientId:number){
this.patientId=patientId
}

confirmArchivePatient(){
  this.spinner.show()
  this.departmentService.archivePatient(this.patientId).subscribe({
    next:(result=>{
      this.spinner.hide()
      this.toastr.success("Patient is archived")
      this.showArchivePatientModal=false
     
    }),
    error:(error=>
    {
      this.showArchivePatientModal=false
      this.spinner.hide()
      this.toastr.error(error.message)
      throw new Error(error.message)
    }
    )
  })

}


onDepartmentChange(event: Event) {
  this.targetDepartmentId = +(event.target as HTMLSelectElement).value;
   const selectedDept = this.departments.find(dept => dept.id === this.targetDepartmentId);

   if (selectedDept) {
     this.spinner.show()
     this.departmentService.getUnits(this.targetDepartmentId).subscribe({
       next: result => {
         this.units = result.data.getUnities;
         this.transferForm.get('unit')?.setValue('');
         if(result){
           setTimeout(()=>{
             this.spinner.hide()
           },1000)

         }
     
       },
       error: error => {
         this.spinner.hide()
         
       }
     });
   } else {
     this.units = [];
   }
 }

 selectUnit(unit: any): void {
  this.selectedUnit = unit;
  
}

selectPatient(patient: any): void {
  this.selectedPatient = patient;
}

 getDepartments(): void {
  this.departmentService.getDepartments().subscribe({
    next: result => {

      this.departments = result.data.getDepartments;

      this.stateService.setDepartmentsCount(this.departments.length);
    },
    error: error => {
      this.toastr.error(error.message)
      throw new Error(error.message)
    }
  });
}

 onUnitChange(event: Event) {
   const unitId = +(event.target as HTMLSelectElement).value;
  
   const selectedUnit = this.units.find(unit => unit.id === unitId);
   this.transferForm.get('unit')?.setValue(selectedUnit?.id || '');
   
 }
 closeTransferModal() {
   this.showTransferModal = false;
 }

 transferPatient() {


   const transferData:TransferPatientInput = {
   targetDepartmentId:parseInt(this.transferForm.value.department),
   targetUnityId:parseInt(this.transferForm.value.unit),
   patientId:parseInt(this.selectedPatient.id)
   }

  
  if(this.transferForm.valid){
  this.spinner.show()
   this.departmentService.transferPatient(transferData).subscribe({
     next:(result=>{
       this.departments=[]
       this.getDepartments();
       setTimeout(()=>{
         this.spinner.hide()
         this.toastr.success("patient transfered successfully")
       },1500)

       
     }),
     error:(error=>{
       this.spinner.hide()
       this.toastr.error(error.message)
       throw new Error(error.message)
     })
   })


  }
   this.closeTransferModal();
 }


}
