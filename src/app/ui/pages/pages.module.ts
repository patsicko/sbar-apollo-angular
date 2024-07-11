import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { MaterialModule } from 'src/app/material.module';
import { LoginComponent } from './login/login.component';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from 'src/app/app-routing.module';
import { UnitsComponent } from './units/units.component';
import { StaffsComponent } from './staffs/staffs.component';
import { PatientsComponent } from './patients/patients.component';
import { OverviewComponent } from './overview/overview.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';





@NgModule({
  declarations: [
    HomepageComponent,
    LoginComponent,
    CreateHospitalComponent,
    AdminDashboardComponent,
    DepartmentsComponent,
    UnitsComponent,
    StaffsComponent,
    PatientsComponent,
    OverviewComponent,
    NotFoundComponent,
    ForbidenComponent,
    CreateStaffComponent,
   
   
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    
  ],

  exports:[
    HomepageComponent,
  
  ]
})
export class PagesModule { }
