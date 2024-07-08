// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Adjust the import path as necessary

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
    private authService: AuthService
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
      const formData = this.loginForm.value;
      this.userService.login(formData).subscribe({
        next: (data) => {
          // Assuming the backend sets the token in the cookie
          this.authService.checkLoginStatus(); // Update the login status
          this.router.navigate(['/dashboard/admin']); // Navigate to the dashboard
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }
}
