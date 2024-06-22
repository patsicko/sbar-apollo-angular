import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './ui/pages/homepage/homepage.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { CreateHospitalComponent } from './ui/pages/create-hospital/create-hospital.component';

const routes: Routes = [
 
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomepageComponent },
{path:'login',component:LoginComponent},
{path:'create-hospital',component:CreateHospitalComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
