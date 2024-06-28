import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup ;
  submitted:boolean=false;

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router,
    private cookieService:CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    this.submitted=true
    const loginInput=this.loginForm.value
    if (this.loginForm.valid) {
      this.submitted=true
      const formdata=this.loginForm.value
      console.log('Form Submitted', formdata);
      
      this.userService.login(formdata).subscribe({
        next:(data=>{
          console.log("token",data);
          const tokenFromCookie=this.cookieService.get('accessToken');
          console.log("token from cookie",tokenFromCookie)
          const decodedToken: any = jwtDecode(tokenFromCookie);
          console.log("decoded token", decodedToken);
          if(decodedToken.role==='admin'){
            this.router.navigate(['/create/hospital'])
          }else if(decodedToken.role==='superAdmin'){
            this.router.navigate(['/dashboard/admin'])
          }
        
        }),
        error:(err=>{
          console.log(err.message)
        })
      })
      // Handle the form submission logic here
   
    }
  }
}
