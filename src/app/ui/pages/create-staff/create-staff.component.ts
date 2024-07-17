import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';
 // Replace with your actual service

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {
  staffForm: FormGroup;
  submitted = false;
  availableRoles: string[] = ['nurse', 'doctor', 'admin', 'technician'];
  



  constructor(
    private formBuilder: FormBuilder,
    private departmentService:DepartmentService,
    private toastr:ToastrService,
    private router:Router
  ) {
    this.staffForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', Validators.required],
      hospitalId: [null, Validators.required]
    });

   }

  ngOnInit(): void {

  }


  onSubmit() {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }

    this.departmentService.createStaff(this.staffForm.value)
      .subscribe(
       {
        next:(result=>{
          console.log("result",result);
          if(result){
            this.staffForm.reset();
            this.router.navigate(['/login']);
            this.toastr.success('Account created successfully')
          }

        }),
        error:(error=>{
          this.toastr.error(error.message);
          throw new Error(error.message)
        })
       }
      );
  }



}
