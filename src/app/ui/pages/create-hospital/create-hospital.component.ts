import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html',
  styleUrls: ['./create-hospital.component.css']
})
export class CreateHospitalComponent implements OnInit {
  hospitalForm: FormGroup;
  submitted:boolean=false;

  constructor(private fb: FormBuilder) {
    this.hospitalForm = this.fb.group({
      hospitalName: ['', [Validators.required]],
      district: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.hospitalForm.valid) {
      console.log('Form Submitted', this.hospitalForm.value);
      // Handle the form submission logic here
    }
  }
}
