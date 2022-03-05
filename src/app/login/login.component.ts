import { User } from '../shared/models/user';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  private user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login(): void {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe({
        next: (response: User) => {
          this.user = response;
          alert(`Welcome, ${this.user.username}!`);
        },
        error: (error: HttpErrorResponse) => {
          alert(
            'Invalid username or password\nError Message:\n' + error.message
          );
        },
      });
    }
  }
}
