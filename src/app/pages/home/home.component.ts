import { AuthService } from '@app/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username = this.authService.userValue?.username;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout();
  }
}
