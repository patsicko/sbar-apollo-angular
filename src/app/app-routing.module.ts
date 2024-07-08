import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './ui/pages/homepage/homepage.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { CreateHospitalComponent } from './ui/pages/create-hospital/create-hospital.component';
import { AdminDashboardComponent } from './ui/pages/admin-dashboard/admin-dashboard.component';
import { DepartmentsComponent } from './ui/pages/departments/departments.component';
import { UnitsComponent } from './ui/pages/units/units.component';
import { StaffsComponent } from './ui/pages/staffs/staffs.component';
import { PatientsComponent } from './ui/pages/patients/patients.component';
import { OverviewComponent } from './ui/pages/overview/overview.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbidenComponent } from './ui/pages/forbiden/forbiden.component';
import { NotFoundComponent } from './ui/pages/not-found/not-found.component';

const routes: Routes = [
 
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomepageComponent },
{path:'login',component:LoginComponent},
{path:'create/hospital',component:CreateHospitalComponent},
{path:'forbidden',component:ForbidenComponent},
{
  path: 'dashboard/admin',
  component: AdminDashboardComponent,
  canActivate: [AuthGuard],
    data: { role: 'admin' },
  children: [
    { path: '', component: OverviewComponent },
    { path: 'departments', component: DepartmentsComponent },
    { path: 'units', component: UnitsComponent },
    {path:'staffs',component:StaffsComponent},
    {path:'patients',component:PatientsComponent}
    // Add other child routes here
  ]
},
{ path: '**', component: NotFoundComponent }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { RouterModule };

