// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {

    this.submitted = true;
    if (this.loginForm.valid) {
      this.spinner.show()
      const formData = this.loginForm.value;
      this.userService.login(formData).subscribe({
        next: (data) => {
           if(data){
             setTimeout(()=>{
              this.spinner.hide()
              this.toastr.success('login successfull')
              this.authService.checkLoginStatus();
              this.router.navigate(['/dashboard/admin']);
            },800)

           }



        },
        error: (err) => {
          this.spinner.hide()
          this.toastr.error(err.message);
          
          console.log(err.message);
        }
      });
    }
  }
}
