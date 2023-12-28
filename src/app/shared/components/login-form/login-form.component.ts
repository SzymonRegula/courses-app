import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.control.markAllAsTouched();
      return;
    }

    const user = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    };

    this.authService.login(user).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (error: Error) => {
        console.error(error.message);
      },
    });
  }
}
