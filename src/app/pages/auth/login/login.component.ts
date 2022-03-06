import { Router } from '@angular/router';
import { User } from '@app/shared/models/user';
import { AuthService } from '@app/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup!: FormGroup;
  private user!: User;

  constructor(private authService: AuthService, private router: Router) {}

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
        next: (response: User | void) => {
          if (response) {
            console.log('Logging');
            this.user = response;
            this.router.navigate(['home']);
          } else {
            alert('Something happened');
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(
            'Invalid username or password\nError Message:\n' + error.message
          ); //TODO Change to UI message, not alert
        },
      });
    }
  }
}
