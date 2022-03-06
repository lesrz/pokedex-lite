import { Router } from '@angular/router';
import { User, UserLogin } from './shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    this.checkLogin();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get user$(): Observable<User | null> {
    return this.user.asObservable();
  }

  get userValue(): User | null {
    return this.user.getValue();
  }

  login(data: UserLogin): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/login`, data).pipe(
      map((res: User) => {
        this.saveUser(res); // Save userId
        this.user.next(res);
        this.loggedIn.next(true); // Logged in
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.loggedIn.next(false); // Logged out
    this.router.navigate(['login']);
  }

  private checkLogin(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}') || null;
    if (user !== undefined) {
      this.user.next(user);
      this.loggedIn.next(true);
    }

    if (!user) {
      this.loggedIn.next(false);
      this.logout();
    }
  }

  private saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
