import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterialModule } from 'src/app/material.module';
import { LoginComponent } from './login/login.component';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';



@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent,
    CreateHospitalComponent,
   
   
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    HomepageComponent,
  
  ]
})
export class PagesModule { }
